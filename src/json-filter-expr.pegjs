// Result type is a function that takes a field value and returns a boolean.
ValueExpression
  = ValueAndExpression
  / ValueOrExpression
  / Condition
  / "" { return function() { return true; } }

ValueAndExpression
  = l:Condition _ 'AND' _ r:( ValueAndExpression / Condition ) { return function(value) { return l(value) && r(value); }; }
  
ValueOrExpression
  = l:Condition _ 'OR' _ r:( ValueOrExpression / Condition ) { return function(value) { return l(value) || r(value); }; }

Condition "condition"
  = v:QuotedString {
    var re = new RegExp(escapeStringRegexp(v), "i");
    return function(value) {
      return typeof(value) === 'string' && re.test(value);
    };
  }
  / v:(Number/BooleanLiteral/NullLiteral) { return function(value) { return value === v; }; }
  / '=' _? v:(QuotedString/Number) { return function(value) { return value === v; }; }
  / '>=' _? v:(QuotedString/Number) { return function(value) { return typeof(value) === typeof(v) && value >= v; }; }
  / '<=' _? v:(QuotedString/Number) { return function(value) { return typeof(value) === typeof(v) && value <= v; }; }
  / '>' _? v:(QuotedString/Number) { return function(value) { return typeof(value) === typeof(v) && value > v; }; }
  / '<' _? v:(QuotedString/Number) { return function(value) { return typeof(value) === typeof(v) && value < v; }; }
  / 'NOT' _ c:Condition { return function(value) { return !c(value); }; }
  / '(' _? c:ValueExpression _? ')' { return c; }
  / v:BareWord {
    var re = new RegExp(escapeStringRegexp(v), "i");
    return function(value) {
      if (value === null)
        return v === 'null';
      switch (typeof(value))
      {
        case 'boolean': return value ? v === 'true' : v === 'false';
        case 'string': return re.test(value);
        default: return false;
      }
    }
  }

QuotedString "string in quotes" = '"' value:QuotedStringCharacter* '"' { return value.join(''); }

QuotedStringCharacter
  = !'"' char:. { return char; }
  / '""' { return "\""; }
  
// TODO: eventually, we want this to allow other languages. Auto-generate this from https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt
BareWord "bare word" = value1:[A-Za-z_] value2:[-_A-Za-z0-9]* { return value1 + value2.join(''); }

Number "number" = '-'?('0'/([1-9][0-9]*))('.'[0-9]+)?([eE][-+]?[0-9]+)? { return Number(text()); }

BooleanLiteral
  = "#true" { return true; }
  / "#false" { return false; }

NullLiteral = "#null" { return null; }

_ "whitespace" = [ ]+