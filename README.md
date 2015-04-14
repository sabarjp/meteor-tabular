meteor-tabular
=========================

This is a fork of [aldeed:tabular](https://github.com/aldeed/meteor-tabular) for usage with responsive tables from [semantic:ui-css](https://atmospherejs.com/semantic/ui-css), instead of the default Bootstrap 3 support that the upstream code contains.

I am currently hacking the necessary css classes together; this is not production ready. Use at your own risk.

## Installation

There is no published package. 

You don't want to have the real aldeed:tabular package installed when you do this.

To test this package, do the following:

```bash
$ meteor create --package aldeed:tabular
$ git clone https://github.com/sabarjp/meteor-tabular.github packages/aldeed\:tabular
$ meteor add aldeed:tabular
```

## Example

Basic usage does work. An example of calling the tabular template with semantic classes:

```js
{{> tabular table=TabularTables.Customers class="ui table"}}
```