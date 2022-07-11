const { BadRequestError } = require("../expressError");


/** Helper function to make limited update queries 
 * The function uses it to make the SET clause of a SQL update statement
 * 
 * dataToUpdate {Object} {field1: newVal, field2: newVal, ...}
 * where Object can be user or company
 * 
 * jsToSql {Object} maps camel-cased JavaScript data fields to snake-cased SQL column names
 * For users: { firstName: "first_name", age: "age" }
 * For companies: {numEmployeers: "num_employees", logoUrl: "logo_url"}
 * 
 * Returns {Object} {setCols, values}
 * 
 * Example: {firstName: 'Aliya', age: 32} =>
 *   { setCols: '"first_name"=$1, "age"=$2',
 *     values: ['Aliya', 32] }
 * 
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
