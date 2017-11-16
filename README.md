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
