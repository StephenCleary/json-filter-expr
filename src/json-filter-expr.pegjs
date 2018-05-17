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
  = v:QuotedString { return function(value) { return value === v; }; } // TODO: not equality
  / v:(Number/BooleanLiteral/NullLiteral) { return function(value) { return value === v; }; }
  / '=' _? v:(QuotedString/Number) { return function(value) { return value === v; }; }
  / '>=' _? v:(QuotedString/Number) { return function(value) { return typeof(value) === typeof(v) && value >= v; }; }
  / '<=' _? v:(QuotedString/Number) { return function(value) { return typeof(value) === typeof(v) && value <= v; }; }
  / '>' _? v:(QuotedString/Number) { return function(value) { return typeof(value) === typeof(v) && value > v; }; }
  / '<' _? v:(QuotedString/Number) { return function(value) { return typeof(value) === typeof(v) && value < v; }; }
  / 'NOT' _ c:Condition { return function(value) { return !c(value); }; }
  / '(' _? c:ValueExpression _? ')' { return c; }

QuotedString "string in quotes" = '"' value:QuotedStringCharacter* '"' { return value.join(''); }

QuotedStringCharacter
  = !'"' char:. { return char; }
  / '""' { return "\""; }
  
BareWord = [A-Za-z_][-_A-Za-z0-9] // TODO: eventually, we want this to allow other languages. Auto-generate this from https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt

Number "number" = '-'?('0'/([1-9][0-9]*))('.'[0-9]+)?([eE][-+]?[0-9]+)? { return Number(text()); }

BooleanLiteral
  = "#true" { return true; }
  / "#false" { return false; }

NullLiteral = "#null" { return null; }

_ "whitespace" = [ ]+