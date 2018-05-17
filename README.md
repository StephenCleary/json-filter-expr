# json-filter-expr
Simple JSON filtering for possibly-slightly-less-technical end users.

# Limitations

## No Implicit Conversion of Data

There are no implicit conversions done of data. If the filter expression compares with a numeric value (e.g., `> 0`), then the data must be a number to match; `1` would match, `"1"` would not.