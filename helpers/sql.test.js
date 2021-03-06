const { sqlForPartialUpdate } = require("./sql");

/** 
describe("sqlForPartialUpdate", function() {
  test("works for 1 item update", function() {
    const result = sqlForPartialUpdate(
      { f1: "v1" },
      { f1: "f1", fF2: "f2" });
  expect(result).toEqual({
    setCols: `"f1"=$1`,
    values: ["v1"],
    });
  });

  test("works for 2 items update", function() {
    const result = sqlForPartialUpdate(
      { f1: "v1", jsF2: "v2"},
      { jsF2: "f2" });
    expect(result).toEqual({
      setCols: `"f1"=$1, "f2"=$2`,
      values:["v1", "v2"]
    });
  });
});

*/

describe("sqlForPartialUpdate", function() {
  test("works for 1 item update", function() {
    const result = sqlForPartialUpdate(
      { field1: "value1" },
      { field1: "field1"});
  expect(result).toEqual({
    setCols: `"field1"=$1`,
    values: ["value1"],
    });
  });


  test("works for 2 items update", function() {
    const result = sqlForPartialUpdate(
      { field1: "value1", jsField2: "value2"},
      { jsField2: "field2" });
    expect(result).toEqual({
      setCols: `"field1"=$1, "field2"=$2`,
      values:["value1", "value2"]
    });
  });
});

