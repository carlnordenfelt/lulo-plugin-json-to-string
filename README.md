# lulo JSON to String

lulo json-to-string is a plugin for [lulo](https://github.com/carlnordenfelt/lulo).

Returns a string representation of the provided JSON structure. 

# Installation
```
$ npm install lulo-plugin-json-to-string --save
```

## Usage
### Properties
* `JSON`: The original JSON structure. Required.
* `TypeCast`: Attempts to cast primitive types back to their original type. See more on type casting below.
### Return Values
The resource will return a string representation of the provided JSON structure which can be accessed via `"Fn::GetAtt"`.

#### Parameters
`{ "Fn::GetAtt: ["ResourceName", "String"] }"`
Gives The JSON structure as a string

### Required IAM Permissions
The Custom Resource Lambda requires no additional IAM Permissions.

## License
[The MIT License (MIT)](/LICENSE)

## Change Log
[Change Log](/CHANGELOG.md)


## Type Casting
CloudFormation has a tendency to convert all properties to strings before giving them to a CustomResource.

In a nutshell this means that:
```
// Input
{
    "JSON": {
        "anInteger": 1
    }
}

// Becomes:
{
    "JSON": {
        "anInteger": "1"
    }
}
```

This oftentimes becomes a problem since a lot of AWS sdk calls does not accept `"1"` in place of `1` for an integer value.

If you provide the `TypeCast` property it will attempt to cast all primitives type back to their original type.

In other words:
```
'1' => 1
'1.1' => 1.1
'true' => true,
'false' => false
```
This works recursively as well as on arrays.

**Note:** The type casting is very eager and will cast anything it finds that matches a given regex (see `src/index.js`).
There is no way to make exceptions from this.
