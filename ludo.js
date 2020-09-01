(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.O.A === region.U.A)
	{
		return 'on line ' + region.O.A;
	}
	return 'on lines ' + region.O.A + ' through ' + region.U.A;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.aC,
		impl.aU,
		impl.aQ,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		k: func(record.k),
		P: record.P,
		M: record.M
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.k;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.P;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.M) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.aC,
		impl.aU,
		impl.aQ,
		function(sendToApp, initialModel) {
			var view = impl.aV;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.aC,
		impl.aU,
		impl.aQ,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.N && impl.N(sendToApp)
			var view = impl.aV;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.av);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.aS) && (_VirtualDom_doc.title = title = doc.aS);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.aF;
	var onUrlRequest = impl.aG;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		N: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.ag === next.ag
							&& curr.Y === next.Y
							&& curr.ad.a === next.ad.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		aC: function(flags)
		{
			return A3(impl.aC, flags, _Browser_getUrl(), key);
		},
		aV: impl.aV,
		aU: impl.aU,
		aQ: impl.aQ
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { aA: 'hidden', aw: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { aA: 'mozHidden', aw: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { aA: 'msHidden', aw: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { aA: 'webkitHidden', aw: 'webkitvisibilitychange' }
		: { aA: 'hidden', aw: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		am: _Browser_getScene(),
		ar: {
			H: _Browser_window.pageXOffset,
			I: _Browser_window.pageYOffset,
			x: _Browser_doc.documentElement.clientWidth,
			s: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		x: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		s: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			am: {
				x: node.scrollWidth,
				s: node.scrollHeight
			},
			ar: {
				H: node.scrollLeft,
				I: node.scrollTop,
				x: node.clientWidth,
				s: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			am: _Browser_getScene(),
			ar: {
				H: x,
				I: y,
				x: _Browser_doc.documentElement.clientWidth,
				s: _Browser_doc.documentElement.clientHeight
			},
			ay: {
				H: x + rect.left,
				I: y + rect.top,
				x: rect.width,
				s: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.a) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.c),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.c);
		} else {
			var treeLen = builder.a * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.d) : builder.d;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.a);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.c) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.c);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{d: nodeList, a: (len / $elm$core$Array$branchFactor) | 0, c: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {W: fragment, Y: host, ab: path, ad: port_, ag: protocol, ah: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$LudoModel$Blue = 2;
var $author$project$LudoModel$Green = 1;
var $author$project$LudoModel$Red = 0;
var $author$project$LudoModel$Yellow = 3;
var $author$project$LudoModel$InStartBoxPosition = function (a) {
	return {$: 1, a: a};
};
var $author$project$LudoModel$defaultPositions = _List_fromArray(
	[
		_Utils_Tuple2(
		0,
		$author$project$LudoModel$InStartBoxPosition(1)),
		_Utils_Tuple2(
		0,
		$author$project$LudoModel$InStartBoxPosition(2)),
		_Utils_Tuple2(
		0,
		$author$project$LudoModel$InStartBoxPosition(3)),
		_Utils_Tuple2(
		0,
		$author$project$LudoModel$InStartBoxPosition(4)),
		_Utils_Tuple2(
		1,
		$author$project$LudoModel$InStartBoxPosition(1)),
		_Utils_Tuple2(
		1,
		$author$project$LudoModel$InStartBoxPosition(2)),
		_Utils_Tuple2(
		1,
		$author$project$LudoModel$InStartBoxPosition(3)),
		_Utils_Tuple2(
		1,
		$author$project$LudoModel$InStartBoxPosition(4)),
		_Utils_Tuple2(
		3,
		$author$project$LudoModel$InStartBoxPosition(1)),
		_Utils_Tuple2(
		3,
		$author$project$LudoModel$InStartBoxPosition(2)),
		_Utils_Tuple2(
		3,
		$author$project$LudoModel$InStartBoxPosition(3)),
		_Utils_Tuple2(
		3,
		$author$project$LudoModel$InStartBoxPosition(4)),
		_Utils_Tuple2(
		2,
		$author$project$LudoModel$InStartBoxPosition(1)),
		_Utils_Tuple2(
		2,
		$author$project$LudoModel$InStartBoxPosition(2)),
		_Utils_Tuple2(
		2,
		$author$project$LudoModel$InStartBoxPosition(3)),
		_Utils_Tuple2(
		2,
		$author$project$LudoModel$InStartBoxPosition(4))
	]);
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Game$init = function (_v0) {
	return _Utils_Tuple2(
		{
			G: 0,
			aI: _List_fromArray(
				[
					{ax: 0, z: false, F: 0},
					{ax: 1, z: false, F: 0},
					{ax: 3, z: false, F: 0},
					{ax: 2, z: false, F: 0}
				]),
			aJ: $author$project$LudoModel$defaultPositions,
			aM: 0,
			aT: {ax: 0, z: false, F: 0}
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$LudoModel$MoveCoin = function (a) {
	return {$: 1, a: a};
};
var $author$project$LudoModel$NewRandomNumber = function (a) {
	return {$: 0, a: a};
};
var $author$project$LudoModel$StartGame = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Ports$diceRolledReceiver = _Platform_incomingPort('diceRolledReceiver', $elm$json$Json$Decode$int);
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $author$project$Ports$joinGameReceiver = _Platform_incomingPort(
	'joinGameReceiver',
	A2(
		$elm$json$Json$Decode$andThen,
		function (_v0) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (_v1) {
					return $elm$json$Json$Decode$succeed(
						_Utils_Tuple2(_v0, _v1));
				},
				A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$int));
		},
		A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$int)));
var $author$project$Ports$moveCoinsReceiver = _Platform_incomingPort(
	'moveCoinsReceiver',
	A2(
		$elm$json$Json$Decode$andThen,
		function (_v0) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (_v1) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (_v2) {
							return $elm$json$Json$Decode$succeed(
								_Utils_Tuple3(_v0, _v1, _v2));
						},
						A2($elm$json$Json$Decode$index, 2, $elm$json$Json$Decode$int));
				},
				A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$int));
		},
		A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$int)));
var $author$project$LudoModel$InCommonPathPosition = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$LudoModel$InHomePathPosition = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $author$project$LudoModel$None = {$: 3};
var $author$project$LudoModel$PathEnd = function (a) {
	return {$: 2, a: a};
};
var $author$project$LudoModel$PathStar = {$: 0};
var $author$project$LudoModel$PathStart = function (a) {
	return {$: 1, a: a};
};
var $author$project$Ports$integerToCommonPath = function (n) {
	switch (n) {
		case 1:
			return $author$project$LudoModel$PathStar;
		case 2:
			return $author$project$LudoModel$PathStart(0);
		case 3:
			return $author$project$LudoModel$PathStart(1);
		case 4:
			return $author$project$LudoModel$PathStart(2);
		case 5:
			return $author$project$LudoModel$PathStart(3);
		case 6:
			return $author$project$LudoModel$PathEnd(0);
		case 7:
			return $author$project$LudoModel$PathEnd(1);
		case 8:
			return $author$project$LudoModel$PathEnd(2);
		case 9:
			return $author$project$LudoModel$PathEnd(3);
		case 10:
			return $author$project$LudoModel$None;
		default:
			return $author$project$LudoModel$None;
	}
};
var $author$project$Ports$tupleToPosition = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	var z = _v0.c;
	switch (x) {
		case 1:
			return A2(
				$author$project$LudoModel$InCommonPathPosition,
				y,
				$author$project$Ports$integerToCommonPath(z));
		case 2:
			return $author$project$LudoModel$InStartBoxPosition(y);
		case 3:
			return A2(
				$author$project$LudoModel$InHomePathPosition,
				function () {
					switch (y) {
						case 1:
							return 0;
						case 2:
							return 2;
						case 3:
							return 1;
						case 4:
							return 3;
						default:
							return 0;
					}
				}(),
				z);
		default:
			return $author$project$LudoModel$InStartBoxPosition(5);
	}
};
var $author$project$Ports$moveCoinsPosReceiver = function (fn) {
	return $author$project$Ports$moveCoinsReceiver(
		function (tuple) {
			return fn(
				$author$project$Ports$tupleToPosition(tuple));
		});
};
var $author$project$Ports$newGameReceiver = _Platform_incomingPort('newGameReceiver', $elm$json$Json$Decode$int);
var $author$project$Game$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Ports$diceRolledReceiver(
				function (num) {
					return $author$project$LudoModel$NewRandomNumber(num);
				}),
				$author$project$Ports$moveCoinsPosReceiver(
				function (pos) {
					return $author$project$LudoModel$MoveCoin(pos);
				}),
				$author$project$Ports$joinGameReceiver(
				function (_v1) {
					var order = _v1.a;
					var maxPlayers = _v1.b;
					return A2($author$project$LudoModel$StartGame, order, maxPlayers);
				}),
				$author$project$Ports$newGameReceiver(
				function (maxPlayers) {
					return A2($author$project$LudoModel$StartGame, 1, maxPlayers);
				})
			]));
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$Ludo$canMove = F2(
	function (model, posInfo) {
		var _v0 = posInfo;
		var playerColor = _v0.a;
		var pos = _v0.b;
		return (!(!model.G)) && (_Utils_eq(model.aT.ax, playerColor) && function () {
			switch (pos.$) {
				case 1:
					return model.G === 6;
				case 2:
					var num = pos.b;
					return !((num + model.G) > 6);
				default:
					return !(!model.G);
			}
		}());
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$LudoUpdate$getParticipantsByMaxPlayers = function (maxPlayers) {
	switch (maxPlayers) {
		case 2:
			return _List_fromArray(
				[
					{ax: 0, z: false, F: 0},
					{ax: 3, z: false, F: 0}
				]);
		case 3:
			return _List_fromArray(
				[
					{ax: 0, z: false, F: 0},
					{ax: 1, z: false, F: 0},
					{ax: 3, z: false, F: 0}
				]);
		default:
			return _List_fromArray(
				[
					{ax: 0, z: false, F: 0},
					{ax: 1, z: false, F: 0},
					{ax: 3, z: false, F: 0},
					{ax: 2, z: false, F: 0}
				]);
	}
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm_community$list_extra$List$Extra$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					return $elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$predicate = predicate,
						$temp$list = xs;
					index = $temp$index;
					predicate = $temp$predicate;
					list = $temp$list;
					continue findIndexHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$findIndex = $elm_community$list_extra$List$Extra$findIndexHelp(0);
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $author$project$Ludo$goalPathReached = F3(
	function (turn, initialPos, updatedPos) {
		return !_Utils_eq(
			A2(
				$elm$core$List$filter,
				function (_v0) {
					var p = _v0.b;
					return _Utils_eq(
						p,
						A2($author$project$LudoModel$InHomePathPosition, turn, 6));
				},
				initialPos),
			A2(
				$elm$core$List$filter,
				function (_v1) {
					var p = _v1.b;
					return _Utils_eq(
						p,
						A2($author$project$LudoModel$InHomePathPosition, turn, 6));
				},
				updatedPos));
	});
var $author$project$Ludo$isHomePositionOccupied = F3(
	function (positions, color, homePosNumber) {
		var list = A2(
			$elm$core$List$filter,
			function (_v3) {
				var c = _v3.a;
				var pos = _v3.b;
				if (!_Utils_eq(c, color)) {
					return false;
				} else {
					if (pos.$ === 1) {
						var n = pos.a;
						return _Utils_eq(n, homePosNumber);
					} else {
						return false;
					}
				}
			},
			positions);
		if (!list.b) {
			return false;
		} else {
			var _v1 = list.a;
			var pos = _v1.b;
			if (pos.$ === 1) {
				return true;
			} else {
				return false;
			}
		}
	});
var $author$project$Ludo$getEmptyHomePosition = F2(
	function (positions, color) {
		var _v0 = A2(
			$elm$core$List$filter,
			function (num) {
				return !A3($author$project$Ludo$isHomePositionOccupied, positions, color, num);
			},
			_List_fromArray(
				[1, 2, 3, 4]));
		if (!_v0.b) {
			return 0;
		} else {
			var x = _v0.a;
			return x;
		}
	});
var $elm_community$list_extra$List$Extra$updateIfIndex = F3(
	function (predicate, update, list) {
		return A2(
			$elm$core$List$indexedMap,
			F2(
				function (i, x) {
					return predicate(i) ? update(x) : x;
				}),
			list);
	});
var $author$project$Ludo$kill = F2(
	function (toBeKilledList, model) {
		kill:
		while (true) {
			if (!toBeKilledList.b) {
				return model.aJ;
			} else {
				var posInfo = toBeKilledList.a;
				var restOfTheList = toBeKilledList.b;
				var positionsAfterKilling = function () {
					var _v1 = A2(
						$elm_community$list_extra$List$Extra$findIndex,
						function (pInfo) {
							return _Utils_eq(pInfo, posInfo);
						},
						model.aJ);
					if (_v1.$ === 1) {
						return model.aJ;
					} else {
						var index = _v1.a;
						return A3(
							$elm_community$list_extra$List$Extra$updateIfIndex,
							$elm$core$Basics$eq(index),
							function (_v2) {
								var color = _v2.a;
								return _Utils_Tuple2(
									color,
									$author$project$LudoModel$InStartBoxPosition(
										A2($author$project$Ludo$getEmptyHomePosition, model.aJ, color)));
							},
							model.aJ);
					}
				}();
				var $temp$toBeKilledList = restOfTheList,
					$temp$model = _Utils_update(
					model,
					{aJ: positionsAfterKilling});
				toBeKilledList = $temp$toBeKilledList;
				model = $temp$model;
				continue kill;
			}
		}
	});
var $author$project$Ludo$killAll = F2(
	function (model, maybePos) {
		if (!maybePos.$) {
			var pos = maybePos.a;
			if (!pos.$) {
				var cPath = pos.b;
				switch (cPath.$) {
					case 0:
						return model.aJ;
					case 1:
						return model.aJ;
					default:
						return A2(
							$author$project$Ludo$kill,
							A2(
								$elm$core$List$filter,
								function (_v3) {
									var color = _v3.a;
									var p = _v3.b;
									return _Utils_eq(p, pos) && (!_Utils_eq(color, model.aT.ax));
								},
								model.aJ),
							model);
				}
			} else {
				return model.aJ;
			}
		} else {
			return model.aJ;
		}
	});
var $author$project$Ludo$killHappened = F3(
	function (color, initialPos, updatedPos) {
		return !_Utils_eq(
			A2(
				$elm$core$List$filter,
				function (_v0) {
					var c = _v0.a;
					return !_Utils_eq(c, color);
				},
				initialPos),
			A2(
				$elm$core$List$filter,
				function (_v1) {
					var c = _v1.a;
					return !_Utils_eq(c, color);
				},
				updatedPos));
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $author$project$Ludo$blueStartPosition = A2(
	$author$project$LudoModel$InCommonPathPosition,
	41,
	$author$project$LudoModel$PathStart(2));
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $author$project$Ludo$greenStartPosition = A2(
	$author$project$LudoModel$InCommonPathPosition,
	15,
	$author$project$LudoModel$PathStart(1));
var $author$project$Ludo$redStartPosition = A2(
	$author$project$LudoModel$InCommonPathPosition,
	2,
	$author$project$LudoModel$PathStart(0));
var $author$project$Ludo$yellowStartPosition = A2(
	$author$project$LudoModel$InCommonPathPosition,
	28,
	$author$project$LudoModel$PathStart(3));
var $author$project$Ludo$ludoGraph = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(1, $author$project$Ludo$redStartPosition),
			_Utils_Tuple2(
			2,
			A2($author$project$LudoModel$InCommonPathPosition, 3, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			3,
			A2($author$project$LudoModel$InCommonPathPosition, 4, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			4,
			A2($author$project$LudoModel$InCommonPathPosition, 5, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			5,
			A2($author$project$LudoModel$InCommonPathPosition, 6, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			6,
			A2($author$project$LudoModel$InCommonPathPosition, 7, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			7,
			A2($author$project$LudoModel$InCommonPathPosition, 8, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			8,
			A2($author$project$LudoModel$InCommonPathPosition, 9, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			9,
			A2($author$project$LudoModel$InCommonPathPosition, 10, $author$project$LudoModel$PathStar)),
			_Utils_Tuple2(
			10,
			A2($author$project$LudoModel$InCommonPathPosition, 11, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			11,
			A2($author$project$LudoModel$InCommonPathPosition, 12, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			12,
			A2(
				$author$project$LudoModel$InCommonPathPosition,
				13,
				$author$project$LudoModel$PathEnd(1))),
			_Utils_Tuple2(
			13,
			A2($author$project$LudoModel$InCommonPathPosition, 14, $author$project$LudoModel$None)),
			_Utils_Tuple2(14, $author$project$Ludo$greenStartPosition),
			_Utils_Tuple2(
			15,
			A2($author$project$LudoModel$InCommonPathPosition, 16, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			16,
			A2($author$project$LudoModel$InCommonPathPosition, 17, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			17,
			A2($author$project$LudoModel$InCommonPathPosition, 18, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			18,
			A2($author$project$LudoModel$InCommonPathPosition, 19, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			19,
			A2($author$project$LudoModel$InCommonPathPosition, 20, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			20,
			A2($author$project$LudoModel$InCommonPathPosition, 21, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			21,
			A2($author$project$LudoModel$InCommonPathPosition, 22, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			22,
			A2($author$project$LudoModel$InCommonPathPosition, 23, $author$project$LudoModel$PathStar)),
			_Utils_Tuple2(
			23,
			A2($author$project$LudoModel$InCommonPathPosition, 24, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			24,
			A2($author$project$LudoModel$InCommonPathPosition, 25, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			25,
			A2(
				$author$project$LudoModel$InCommonPathPosition,
				26,
				$author$project$LudoModel$PathEnd(3))),
			_Utils_Tuple2(
			26,
			A2($author$project$LudoModel$InCommonPathPosition, 27, $author$project$LudoModel$None)),
			_Utils_Tuple2(27, $author$project$Ludo$yellowStartPosition),
			_Utils_Tuple2(
			28,
			A2($author$project$LudoModel$InCommonPathPosition, 29, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			29,
			A2($author$project$LudoModel$InCommonPathPosition, 30, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			30,
			A2($author$project$LudoModel$InCommonPathPosition, 31, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			31,
			A2($author$project$LudoModel$InCommonPathPosition, 32, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			32,
			A2($author$project$LudoModel$InCommonPathPosition, 33, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			33,
			A2($author$project$LudoModel$InCommonPathPosition, 34, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			34,
			A2($author$project$LudoModel$InCommonPathPosition, 35, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			35,
			A2($author$project$LudoModel$InCommonPathPosition, 36, $author$project$LudoModel$PathStar)),
			_Utils_Tuple2(
			36,
			A2($author$project$LudoModel$InCommonPathPosition, 37, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			37,
			A2($author$project$LudoModel$InCommonPathPosition, 38, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			38,
			A2(
				$author$project$LudoModel$InCommonPathPosition,
				39,
				$author$project$LudoModel$PathEnd(2))),
			_Utils_Tuple2(
			39,
			A2($author$project$LudoModel$InCommonPathPosition, 40, $author$project$LudoModel$None)),
			_Utils_Tuple2(40, $author$project$Ludo$blueStartPosition),
			_Utils_Tuple2(
			41,
			A2($author$project$LudoModel$InCommonPathPosition, 42, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			42,
			A2($author$project$LudoModel$InCommonPathPosition, 43, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			43,
			A2($author$project$LudoModel$InCommonPathPosition, 44, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			44,
			A2($author$project$LudoModel$InCommonPathPosition, 45, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			45,
			A2($author$project$LudoModel$InCommonPathPosition, 46, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			46,
			A2($author$project$LudoModel$InCommonPathPosition, 47, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			47,
			A2($author$project$LudoModel$InCommonPathPosition, 48, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			48,
			A2($author$project$LudoModel$InCommonPathPosition, 49, $author$project$LudoModel$PathStar)),
			_Utils_Tuple2(
			49,
			A2($author$project$LudoModel$InCommonPathPosition, 50, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			50,
			A2($author$project$LudoModel$InCommonPathPosition, 51, $author$project$LudoModel$None)),
			_Utils_Tuple2(
			51,
			A2(
				$author$project$LudoModel$InCommonPathPosition,
				52,
				$author$project$LudoModel$PathEnd(0))),
			_Utils_Tuple2(
			52,
			A2($author$project$LudoModel$InCommonPathPosition, 1, $author$project$LudoModel$None))
		]));
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Ludo$findNextPositionInCommonPath = function (n) {
	return A2(
		$elm$core$Maybe$withDefault,
		A2($author$project$LudoModel$InCommonPathPosition, 1, $author$project$LudoModel$None),
		A2($elm$core$Dict$get, n, $author$project$Ludo$ludoGraph));
};
var $author$project$Ludo$findInGraph = F2(
	function (turn, currentPosition) {
		switch (currentPosition.$) {
			case 0:
				var n = currentPosition.a;
				var commonPathInfo = currentPosition.b;
				if (commonPathInfo.$ === 2) {
					var color = commonPathInfo.a;
					return _Utils_eq(color, turn) ? A2($author$project$LudoModel$InHomePathPosition, color, 1) : $author$project$Ludo$findNextPositionInCommonPath(n);
				} else {
					return $author$project$Ludo$findNextPositionInCommonPath(n);
				}
			case 2:
				var playercolor = currentPosition.a;
				var n = currentPosition.b;
				return A2($author$project$LudoModel$InHomePathPosition, playercolor, n + 1);
			default:
				return A2($author$project$LudoModel$InCommonPathPosition, 1, $author$project$LudoModel$None);
		}
	});
var $author$project$Ludo$move = F3(
	function (posInfo, model, clickedPosition) {
		move:
		while (true) {
			var _v0 = posInfo;
			var color = _v0.a;
			var currentPosition = _v0.b;
			if ((!_Utils_eq(model.aT.ax, color)) || (!model.G)) {
				return posInfo;
			} else {
				var pos = A2($author$project$Ludo$findInGraph, model.aT.ax, currentPosition);
				var $temp$posInfo = _Utils_Tuple2(color, pos),
					$temp$model = _Utils_update(
					model,
					{G: model.G - 1}),
					$temp$clickedPosition = clickedPosition;
				posInfo = $temp$posInfo;
				model = $temp$model;
				clickedPosition = $temp$clickedPosition;
				continue move;
			}
		}
	});
var $author$project$Ludo$nextTurn = F2(
	function (model, participant) {
		nextTurn:
		while (true) {
			var nextPlayer = function () {
				var _v0 = model.aI;
				_v0$3:
				while (true) {
					if (_v0.b && _v0.b.b) {
						if (!_v0.b.b.b) {
							var first = _v0.a;
							var _v1 = _v0.b;
							var second = _v1.a;
							return _Utils_eq(participant, first) ? second : first;
						} else {
							if (_v0.b.b.b.b) {
								if (!_v0.b.b.b.b.b) {
									var first = _v0.a;
									var _v2 = _v0.b;
									var second = _v2.a;
									var _v3 = _v2.b;
									var third = _v3.a;
									var _v4 = _v3.b;
									var fourth = _v4.a;
									return _Utils_eq(participant, first) ? second : (_Utils_eq(participant, second) ? third : (_Utils_eq(participant, third) ? fourth : first));
								} else {
									break _v0$3;
								}
							} else {
								var first = _v0.a;
								var _v5 = _v0.b;
								var second = _v5.a;
								var _v6 = _v5.b;
								var third = _v6.a;
								return _Utils_eq(participant, first) ? second : (_Utils_eq(participant, second) ? third : first);
							}
						}
					} else {
						break _v0$3;
					}
				}
				return participant;
			}();
			if (_Utils_eq(
				$elm$core$List$length(
					A2(
						$elm$core$List$filter,
						function (p) {
							return p.z;
						},
						model.aI)),
				$elm$core$List$length(model.aI) - 1)) {
				return participant;
			} else {
				if (nextPlayer.z) {
					var $temp$model = model,
						$temp$participant = nextPlayer;
					model = $temp$model;
					participant = $temp$participant;
					continue nextTurn;
				} else {
					return nextPlayer;
				}
			}
		}
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm_community$list_extra$List$Extra$updateAt = F3(
	function (index, fn, list) {
		if (index < 0) {
			return list;
		} else {
			var tail = A2($elm$core$List$drop, index, list);
			var head = A2($elm$core$List$take, index, list);
			if (tail.b) {
				var x = tail.a;
				var xs = tail.b;
				return _Utils_ap(
					head,
					A2(
						$elm$core$List$cons,
						fn(x),
						xs));
			} else {
				return list;
			}
		}
	});
var $author$project$Ludo$getAllWinners = F2(
	function (participants, positions) {
		return A2(
			$elm$core$List$filter,
			function (p) {
				return A2(
					$elm$core$List$all,
					function (_v0) {
						var color = _v0.a;
						var pos = _v0.b;
						return (!_Utils_eq(color, p.ax)) || _Utils_eq(
							pos,
							A2($author$project$LudoModel$InHomePathPosition, color, 6));
					},
					positions);
			},
			participants);
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Ludo$updateParticipant = F3(
	function (participant, participants, positions) {
		var winners = A2($author$project$Ludo$getAllWinners, participants, positions);
		return A2($elm$core$List$member, participant, winners) ? _Utils_update(
			participant,
			{
				z: true,
				F: $elm$core$List$length(winners)
			}) : participant;
	});
var $author$project$Ludo$updateParticipants = F2(
	function (participants, positions) {
		return A2(
			$elm$core$List$map,
			function (participant) {
				return participant.z ? participant : A3($author$project$Ludo$updateParticipant, participant, participants, positions);
			},
			participants);
	});
var $author$project$Ludo$moveInCommonPath = F2(
	function (clickedPosition, model) {
		var maybeIndex = A2(
			$elm_community$list_extra$List$Extra$findIndex,
			function (posInfo) {
				var _v2 = posInfo;
				var color = _v2.a;
				var currentPosition = _v2.b;
				return _Utils_eq(currentPosition, clickedPosition) && _Utils_eq(color, model.aT.ax);
			},
			model.aJ);
		var updatedPos = function () {
			if (!maybeIndex.$) {
				var index = maybeIndex.a;
				var updatedPositions = A3(
					$elm_community$list_extra$List$Extra$updateAt,
					index,
					function (posInfo) {
						return A3($author$project$Ludo$move, posInfo, model, clickedPosition);
					},
					model.aJ);
				var maybePos = A2(
					$elm$core$Maybe$map,
					function (_v1) {
						var p = _v1.b;
						return p;
					},
					A2($elm_community$list_extra$List$Extra$getAt, index, updatedPositions));
				return A2(
					$author$project$Ludo$killAll,
					_Utils_update(
						model,
						{aJ: updatedPositions}),
					maybePos);
			} else {
				return model.aJ;
			}
		}();
		var updatedParticipants = A2($author$project$Ludo$updateParticipants, model.aI, updatedPos);
		var updatedModel = _Utils_update(
			model,
			{G: 0, aI: updatedParticipants, aJ: updatedPos});
		var updatedTurn = ((model.G === 6) || (A3($author$project$Ludo$killHappened, updatedModel.aT.ax, model.aJ, updatedPos) || A3($author$project$Ludo$goalPathReached, updatedModel.aT.ax, model.aJ, updatedPos))) ? updatedModel.aT : A2($author$project$Ludo$nextTurn, updatedModel, updatedModel.aT);
		return _Utils_update(
			updatedModel,
			{aT: updatedTurn});
	});
var $author$project$Ludo$getStartPosition = function (color) {
	switch (color) {
		case 0:
			return $author$project$Ludo$redStartPosition;
		case 1:
			return $author$project$Ludo$greenStartPosition;
		case 2:
			return $author$project$Ludo$blueStartPosition;
		default:
			return $author$project$Ludo$yellowStartPosition;
	}
};
var $author$project$Ludo$moveStartBoxPosition = F3(
	function (model, colorClicked, num) {
		return _Utils_update(
			model,
			{
				G: 0,
				aJ: A2(
					$elm$core$List$map,
					function (posInfo) {
						var _v0 = posInfo;
						var color = _v0.a;
						var pos = _v0.b;
						return (_Utils_eq(colorClicked, color) && function () {
							if (pos.$ === 1) {
								var n = pos.a;
								return _Utils_eq(n, num);
							} else {
								return false;
							}
						}()) ? _Utils_Tuple2(
							color,
							$author$project$Ludo$getStartPosition(color)) : posInfo;
					},
					model.aJ)
			});
	});
var $author$project$Ludo$moveAllType = F2(
	function (model, clickedPosition) {
		if (clickedPosition.$ === 1) {
			var n = clickedPosition.a;
			return A3($author$project$Ludo$moveStartBoxPosition, model, model.aT.ax, n);
		} else {
			return A2($author$project$Ludo$moveInCommonPath, clickedPosition, model);
		}
	});
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $author$project$Ports$moveCoins = _Platform_outgoingPort(
	'moveCoins',
	function ($) {
		var a = $.a;
		var b = $.b;
		var c = $.c;
		return A2(
			$elm$json$Json$Encode$list,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					$elm$json$Json$Encode$int(a),
					$elm$json$Json$Encode$int(b),
					$elm$json$Json$Encode$int(c)
				]));
	});
var $author$project$Ports$commonPathToInteger = function (commonPath) {
	switch (commonPath.$) {
		case 0:
			return 1;
		case 1:
			var color = commonPath.a;
			switch (color) {
				case 0:
					return 2;
				case 1:
					return 3;
				case 2:
					return 4;
				default:
					return 5;
			}
		case 2:
			var color = commonPath.a;
			switch (color) {
				case 0:
					return 6;
				case 1:
					return 7;
				case 2:
					return 8;
				default:
					return 9;
			}
		default:
			return 10;
	}
};
var $author$project$Ports$positionToTuple = function (pos) {
	switch (pos.$) {
		case 0:
			var n = pos.a;
			var cPath = pos.b;
			return _Utils_Tuple3(
				1,
				n,
				$author$project$Ports$commonPathToInteger(cPath));
		case 1:
			var n = pos.a;
			return _Utils_Tuple3(2, n, 0);
		default:
			var playercolor = pos.a;
			var n = pos.b;
			return _Utils_Tuple3(
				3,
				function () {
					switch (playercolor) {
						case 0:
							return 1;
						case 2:
							return 2;
						case 1:
							return 3;
						default:
							return 4;
					}
				}(),
				n);
	}
};
var $author$project$Ports$movePosCoins = function (pos) {
	return $author$project$Ports$moveCoins(
		$author$project$Ports$positionToTuple(pos));
};
var $author$project$LudoUpdate$orderToPlayerColor = F2(
	function (model, order) {
		var maybeParticipant = A2($elm_community$list_extra$List$Extra$getAt, order, model.aI);
		if (!maybeParticipant.$) {
			var par = maybeParticipant.a;
			return par.ax;
		} else {
			return 0;
		}
	});
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Ports$rollDice = _Platform_outgoingPort(
	'rollDice',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$LudoUpdate$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var number = msg.a;
				return _Utils_Tuple2(
					function () {
						var movable = A2(
							$elm$core$List$filter,
							$author$project$Ludo$canMove(
								_Utils_update(
									model,
									{G: number})),
							model.aJ);
						if (!movable.b) {
							return _Utils_update(
								model,
								{
									G: 0,
									aT: A2($author$project$Ludo$nextTurn, model, model.aT)
								});
						} else {
							if (!movable.b.b) {
								var _v2 = movable.a;
								var pos = _v2.b;
								return A2(
									$author$project$Ludo$moveAllType,
									_Utils_update(
										model,
										{G: number}),
									pos);
							} else {
								var list = movable;
								if (A2(
									$elm$core$List$all,
									function (_v3) {
										var pos = _v3.b;
										if (pos.$ === 1) {
											return true;
										} else {
											return false;
										}
									},
									list) || function () {
									var headOfTheList = $elm$core$List$head(list);
									return A2(
										$elm$core$List$all,
										function (val) {
											return _Utils_eq(
												$elm$core$Maybe$Just(val),
												headOfTheList);
										},
										list);
								}()) {
									var _v5 = $elm$core$List$head(list);
									if (!_v5.$) {
										var _v6 = _v5.a;
										var pos = _v6.b;
										return A2(
											$author$project$Ludo$moveAllType,
											_Utils_update(
												model,
												{G: number}),
											pos);
									} else {
										return model;
									}
								} else {
									return _Utils_update(
										model,
										{G: number, aT: model.aT});
								}
							}
						}
					}(),
					$elm$core$Platform$Cmd$none);
			case 1:
				var clickedPosition = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Ludo$moveAllType, model, clickedPosition),
					$elm$core$Platform$Cmd$none);
			case 3:
				var clickedPosition = msg.a;
				return _Utils_Tuple2(
					model,
					$author$project$Ports$movePosCoins(clickedPosition));
			case 2:
				return _Utils_Tuple2(
					model,
					$author$project$Ports$rollDice(0));
			default:
				var order = msg.a;
				var maxPlayers = msg.b;
				var modelWithUpdatedParticipants = _Utils_update(
					model,
					{
						aI: $author$project$LudoUpdate$getParticipantsByMaxPlayers(maxPlayers)
					});
				var updatedModel = _Utils_update(
					modelWithUpdatedParticipants,
					{
						aM: A2($author$project$LudoUpdate$orderToPlayerColor, modelWithUpdatedParticipants, order - 1)
					});
				return _Utils_Tuple2(
					_Utils_update(
						updatedModel,
						{
							aJ: A2(
								$elm$core$List$filter,
								function (_v7) {
									var color = _v7.a;
									return !_Utils_eq(
										A2(
											$elm$core$List$filter,
											function (c) {
												return _Utils_eq(c.ax, color);
											},
											updatedModel.aI),
										_List_Nil);
								},
								updatedModel.aJ)
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$Cell$Horizontal = 1;
var $author$project$Cell$None = 2;
var $author$project$Cell$Vertical = 0;
var $author$project$Ludo$commonPathList = A2(
	$elm$core$List$map,
	function (x) {
		var _v0 = A2($elm$core$Dict$get, x - 1, $author$project$Ludo$ludoGraph);
		if (_v0.$ === 1) {
			return A2($author$project$LudoModel$InCommonPathPosition, 1, $author$project$LudoModel$None);
		} else {
			var node = _v0.a;
			return node;
		}
	},
	$elm$core$Dict$keys($author$project$Ludo$ludoGraph));
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{d: nodeList, a: nodeListSize, c: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $author$project$LudoModel$MakeMove = function (a) {
	return {$: 3, a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $author$project$Ludo$findCoinsAtCoinPosition = F2(
	function (positions, indexPosition) {
		return A2(
			$elm$core$List$filter,
			function (pos) {
				var _v0 = pos;
				var p = _v0.b;
				return _Utils_eq(p, indexPosition);
			},
			positions);
	});
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $author$project$Coin$coin = F2(
	function (_class, i) {
		return A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$cx(
					$elm$core$String$fromInt(50 + (i * 10))),
					$elm$svg$Svg$Attributes$cy('50'),
					$elm$svg$Svg$Attributes$r(
					$elm$core$String$fromInt(45)),
					$elm$svg$Svg$Attributes$stroke('black'),
					$elm$svg$Svg$Attributes$strokeWidth('1'),
					$elm$svg$Svg$Attributes$fill(_class)
				]),
			_List_Nil);
	});
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $author$project$Cell$multipleCoins = function (list) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$viewBox('0 0 100 100'),
				$elm$svg$Svg$Attributes$class('w-full h-full text-red-700')
			]),
		A2(
			$elm$core$List$indexedMap,
			F2(
				function (i, pos) {
					var _v0 = pos;
					var color = _v0.a;
					switch (color) {
						case 0:
							return A2($author$project$Coin$coin, 'red', i);
						case 1:
							return A2($author$project$Coin$coin, 'green', i);
						case 2:
							return A2($author$project$Coin$coin, 'blue', i);
						default:
							return A2($author$project$Coin$coin, 'yellow', i);
					}
				}),
			list));
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Cell$cell = F3(
	function (orientation, coinPosition, model) {
		var orientationClassName = function () {
			switch (orientation) {
				case 0:
					return 'w-full h-1/6';
				case 1:
					return 'inline-block w-1/6 h-full';
				default:
					return 'w-full h-full';
			}
		}();
		var colorClassName = _Utils_ap(
			orientationClassName,
			function () {
				if (!coinPosition.$) {
					var n = coinPosition.a;
					var cPath = coinPosition.b;
					if (cPath.$ === 1) {
						var color = cPath.a;
						switch (color) {
							case 0:
								return '   text-red-500 bg-red-800  ';
							case 2:
								return '  text-blue-500 bg-blue-800  ';
							case 3:
								return '  text-yellow-500 bg-yellow-800  ';
							default:
								return '  text-green-500 bg-green-800  ';
						}
					} else {
						return ' text-gray-700  ';
					}
				} else {
					return ' text-gray-700 ';
				}
			}());
		var coinsAtPosition = A2($author$project$Ludo$findCoinsAtCoinPosition, model.aJ, coinPosition);
		var clickable = _Utils_eq(model.aT.ax, model.aM) && A2(
			$elm$core$List$any,
			$author$project$Ludo$canMove(model),
			coinsAtPosition);
		var focusClass = colorClassName + ('  ' + (clickable ? ' animate__animated animate__heartBeat animate__infinite ' : ''));
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('focus:outline-none  align-middle truncate text-center m-auto   break-words ' + (' ' + focusClass)),
					clickable ? $elm$html$Html$Events$onClick(
					$author$project$LudoModel$MakeMove(coinPosition)) : $elm$html$Html$Attributes$disabled(true)
				]),
			_List_fromArray(
				[
					function () {
					if (!coinsAtPosition.b) {
						if (!coinPosition.$) {
							var n = coinPosition.a;
							var cPath = coinPosition.b;
							switch (cPath.$) {
								case 3:
									return $elm$html$Html$text('.');
								case 0:
									return $elm$html$Html$text('✫');
								case 1:
									return $elm$html$Html$text('✫');
								default:
									var color = cPath.a;
									return $elm$html$Html$text(
										function () {
											switch (color) {
												case 0:
													return '👉';
												case 2:
													return '👆';
												case 1:
													return '👇';
												default:
													return '👈';
											}
										}());
							}
						} else {
							return $elm$html$Html$text('.');
						}
					} else {
						var list = coinsAtPosition;
						var length = $elm$core$List$length(list);
						var letterSpacingStyle = (length === 1) ? '' : ((length < 8) ? '-0.8em' : '-0.9em');
						var className = ' tracking-tighter break-words ' + ((length === 1) ? ' text-right ' : 'text-left');
						return A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class(className),
									A2($elm$html$Html$Attributes$style, 'letter-spacing', letterSpacingStyle)
								]),
							_List_fromArray(
								[
									$author$project$Cell$multipleCoins(list)
								]));
					}
				}()
				]));
	});
var $author$project$CommonPath$nodeToHorizontalCell = F3(
	function (orientation, model, coinPosition) {
		return A3($author$project$Cell$cell, orientation, coinPosition, model);
	});
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.c)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.c, tail);
		return (notAppended < 0) ? {
			d: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.d),
			a: builder.a + 1,
			c: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			d: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.d),
			a: builder.a + 1,
			c: $elm$core$Elm$JsArray$empty
		} : {d: builder.d, a: builder.a, c: appended});
	});
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (!node.$) {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						d: _List_Nil,
						a: 0,
						c: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (!_v0.$) {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (!_v0.$) {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $author$project$CommonPath$cellRow = F4(
	function (orientation, model, start, end) {
		var slicedList = $elm$core$Array$toList(
			A3(
				$elm$core$Array$slice,
				start,
				end,
				$elm$core$Array$fromList($author$project$Ludo$commonPathList)));
		return A2(
			$elm$core$List$map,
			A2($author$project$CommonPath$nodeToHorizontalCell, orientation, model),
			slicedList);
	});
var $author$project$CommonPath$commonPath = function (model) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-start-1 row-start-7 col-span-6 ')
				]),
			A4($author$project$CommonPath$cellRow, 1, model, 0, 6)),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-start-1 row-start-0 col-start-7 row-span-6 ')
				]),
			$elm$core$List$reverse(
				A4($author$project$CommonPath$cellRow, 0, model, 6, 12))),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-start-8 row-start-1 ')
				]),
			$elm$core$List$reverse(
				A4($author$project$CommonPath$cellRow, 2, model, 12, 13))),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-start-9 row-start-1 row-span-6 ')
				]),
			A4($author$project$CommonPath$cellRow, 0, model, 13, 19)),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-start-10 row-start-7 col-span-6 ')
				]),
			A4($author$project$CommonPath$cellRow, 1, model, 19, 25)),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-start-15 row-start-8 ')
				]),
			A4($author$project$CommonPath$cellRow, 2, model, 25, 26)),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-start-10 row-start-9 col-span-6 ')
				]),
			$elm$core$List$reverse(
				A4($author$project$CommonPath$cellRow, 1, model, 26, 32))),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-start-9 row-start-10 row-span-6 ')
				]),
			A4($author$project$CommonPath$cellRow, 0, model, 32, 38)),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-start-8 row-start-15  ')
				]),
			A4($author$project$CommonPath$cellRow, 2, model, 38, 39)),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-start-7 row-start-10 row-span-6 ')
				]),
			$elm$core$List$reverse(
				A4($author$project$CommonPath$cellRow, 0, model, 39, 45))),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-start-1 row-start-9 col-span-6 ')
				]),
			$elm$core$List$reverse(
				A4($author$project$CommonPath$cellRow, 1, model, 45, 51))),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-start-1 row-start-8  ')
				]),
			A4($author$project$CommonPath$cellRow, 2, model, 51, 52))
		]);
};
var $author$project$LudoModel$RollDice = {$: 2};
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$html$Html$Attributes$hidden = $elm$html$Html$Attributes$boolProperty('hidden');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $author$project$Dice$diceDiv = function (model) {
	var positionClass = function () {
		var _v0 = model.aT.ax;
		switch (_v0) {
			case 0:
				return 'col-start-3 row-start-3';
			case 2:
				return 'col-start-3 row-start-12';
			case 1:
				return 'col-start-12 row-start-3';
			default:
				return 'col-start-12 row-start-12';
		}
	}();
	var positionClassWithAnimation = _Utils_ap(
		positionClass,
		(!model.G) ? ' animate__animated animate__bounce animate__infinite  ' : ' animate__animated animate__wobble  ');
	return (!model.G) ? A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				((!model.G) && _Utils_eq(model.aT.ax, model.aM)) ? $elm$html$Html$Events$onClick($author$project$LudoModel$RollDice) : $elm$html$Html$Attributes$hidden(false),
				$elm$svg$Svg$Attributes$viewBox('0 0 512 512'),
				$elm$svg$Svg$Attributes$class('disabled:opacity-50 outline-none focus:outline-none  hover:bg-gray-600  col-span-2 row-span-2  animate__animated animate__bounce text-center ' + positionClassWithAnimation)
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M0 0h512v512H0z'),
						$elm$svg$Svg$Attributes$fill('#000'),
						$elm$svg$Svg$Attributes$fillOpacity('0')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class(''),
						$elm$svg$Svg$Attributes$transform('translate(0,0)'),
						$elm$svg$Svg$Attributes$style('touch-action: none;')
					]),
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$path,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$d('M255.703 44.764c-6.176 0-12.353 1.384-17.137 4.152l-152.752 88.36c-9.57 5.535-9.57 14.29 0 19.826l152.752 88.359c9.57 5.536 24.703 5.536 34.272 0l152.754-88.36c9.57-5.534 9.57-14.289 0-19.824L272.838 48.916c-4.785-2.77-10.96-4.152-17.135-4.152zm-14.887 48.478c12.954.21 24.983 3.786 36.088 10.727 6.85 4.28 11.7 9.21 14.555 14.787 2.798 5.542 4.201 14.398 4.209 26.566l.059 28.848 48.441-29.065L368 160l-80 48-23.832-14.895-.32-49.425c-.117-4.47-1.084-8.326-2.9-11.569-1.817-3.242-4.634-6.057-8.452-8.443-5.895-3.684-12.384-5.602-19.467-5.754-7.034-.181-13.426 1.454-19.177 4.904-4.424 2.655-8.17 6.244-11.24 10.768-3.127 4.489-5.556 9.868-7.286 16.133l-27.62-17.264a101.484 101.484 0 0 1 13.476-14.79c4.951-4.554 10.425-8.63 16.422-12.228 13.173-7.904 26.71-11.968 40.609-12.193a75.55 75.55 0 0 1 2.603-.002zm195.051 80.572c-1.938.074-4.218.858-6.955 2.413l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.699c0 11.05 7.57 15.419 17.14 9.89l146.937-84.843c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c-2.497-8.048-5.23-12.495-10.184-12.308zm-359.763.48c-6.227 0-10.033 5.325-10.155 11.825v157.697c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.141 1.156 17.141-9.895v-157.7c0-11.051-7.57-24.159-17.14-29.687L83.09 176.225c-2.567-1.338-4.911-1.93-6.986-1.93zM112 230.56l26.363 9.26 27.807 16.683v111.77L192 383.77V408l-79.316-47.59v-24.23l25.832 15.498v-87.903L112 254.424v-23.865zm271.182 9.203c.441-.013.874-.01 1.295.006.962.037 1.869.151 2.722.341 6.874 1.437 10.313 7.774 10.313 19.012 0 7.668-1.637 14.941-4.908 21.82-3.272 6.821-8.106 13.147-14.506 18.977 7.158-2.012 12.587-1.29 16.285 2.17 3.745 3.372 5.617 9.417 5.617 18.139 0 12.994-4.03 25.304-12.09 36.93-8.06 11.566-19.815 21.986-35.27 31.259-5.451 3.271-10.928 6-16.427 8.188-5.452 2.217-10.856 3.85-16.213 4.898v-26.076a53.81 53.81 0 0 0 15.219-1.93c5.072-1.463 10.048-3.66 14.931-6.59 7.254-4.352 12.801-9.23 16.641-14.636 3.887-5.435 5.832-11.051 5.832-16.846 0-5.97-1.992-9.281-5.975-9.936-3.934-.741-9.764 1.206-17.492 5.842l-10.95 6.57v-21.773l11.519-6.912c6.874-4.125 11.993-8.513 15.359-13.166 3.366-4.712 5.049-9.791 5.049-15.235 0-5.033-1.635-7.944-4.906-8.732-3.272-.788-7.894.61-13.868 4.193-4.409 2.646-8.865 5.934-13.369 9.866-4.503 3.931-8.983 8.434-13.44 13.507v-24.76c5.405-5.115 10.763-9.734 16.073-13.857 5.31-4.122 10.525-7.719 15.645-10.79 11.316-6.79 20.287-10.284 26.914-10.48z'),
								$elm$svg$Svg$Attributes$fill('#fff'),
								$elm$svg$Svg$Attributes$fillOpacity('1')
							]),
						_List_Nil)
					]))
			])) : A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('disabled:opacity-50  border hover:bg-gray-600  col-span-2 row-span-2  animate__animated animate__bounce text-center ' + positionClassWithAnimation)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(
				$elm$core$String$fromInt(model.G))
			]));
};
var $author$project$Game$endPath = function (model) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('  col-start-2 row-start-8 col-span-6 bg-red-800  ')
				]),
			A2(
				$elm$core$List$map,
				function (b) {
					return A3(
						$author$project$Cell$cell,
						1,
						A2($author$project$LudoModel$InHomePathPosition, 0, b),
						model);
				},
				_List_fromArray(
					[1, 2, 3, 4, 5, 6]))),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('  col-start-8 row-start-2 row-span-6  bg-green-800  ')
				]),
			A2(
				$elm$core$List$map,
				function (b) {
					return A3(
						$author$project$Cell$cell,
						0,
						A2($author$project$LudoModel$InHomePathPosition, 1, b),
						model);
				},
				_List_fromArray(
					[1, 2, 3, 4, 5, 6]))),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('  col-start-9 row-start-8 col-span-6 bg-yellow-800  ')
				]),
			A2(
				$elm$core$List$map,
				function (b) {
					return A3(
						$author$project$Cell$cell,
						1,
						A2($author$project$LudoModel$InHomePathPosition, 3, b),
						model);
				},
				_List_fromArray(
					[6, 5, 4, 3, 2, 1]))),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('  col-start-8 row-start-9 row-span-6 bg-blue-800 ')
				]),
			A2(
				$elm$core$List$map,
				function (b) {
					return A3(
						$author$project$Cell$cell,
						0,
						A2($author$project$LudoModel$InHomePathPosition, 2, b),
						model);
				},
				_List_fromArray(
					[6, 5, 4, 3, 2, 1])))
		]);
};
var $author$project$HomeBoxes$homeBox = F2(
	function (className, color) {
		var computedClassName = _Utils_ap(
			function () {
				switch (color) {
					case 0:
						return ' border-red-700 ';
					case 1:
						return ' border-green-700 ';
					case 2:
						return ' border-blue-700 ';
					default:
						return ' border-yellow-700 ';
				}
			}(),
			className);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-span-3 row-span-3 m-5 rounded-full  border ' + computedClassName)
				]),
			_List_Nil);
	});
var $author$project$HomeBoxes$blueHomeBoxes = _List_fromArray(
	[
		A2($author$project$HomeBoxes$homeBox, 'col-start-1 row-start-10', 2),
		A2($author$project$HomeBoxes$homeBox, 'col-start-4 row-start-10', 2),
		A2($author$project$HomeBoxes$homeBox, 'col-start-1 row-start-13', 2),
		A2($author$project$HomeBoxes$homeBox, 'col-start-4 row-start-13', 2)
	]);
var $author$project$HomeBoxes$mineClass = F2(
	function (model, color) {
		return _Utils_eq(model.aM, color) ? ' shadow-outline' : '';
	});
var $author$project$HomeBoxes$colorHomeBoxes = function (model) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					'col-start-1 row-start-1 border-4 row-span-6 border-red-800 col-span-6 rounded-lg ' + A2($author$project$HomeBoxes$mineClass, model, 0))
				]),
			_List_Nil),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					'col-start-10 row-start-1 border-4 row-span-6 border-green-800 col-span-6 rounded-lg' + A2($author$project$HomeBoxes$mineClass, model, 1))
				]),
			_List_Nil),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					'col-start-1 row-start-10 border-4 row-span-6 border-blue-800 col-span-6 rounded-lg' + A2($author$project$HomeBoxes$mineClass, model, 2))
				]),
			_List_Nil),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					'col-start-10 row-start-10 border-4 row-span-6 border-yellow-800  col-span-6 rounded-lg' + A2($author$project$HomeBoxes$mineClass, model, 3))
				]),
			_List_Nil),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-start-7 row-start-7  row-span-3  col-span-3 rounded-lg grid grid-cols-3  grid-rows-3')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('  col-start-1 row-start-1 row-span-2 border-l-4 border-t-4 border-red-800  ')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('  col-start-2 row-start-1 col-span-2 border-t-4 border-r-4 border-green-800  ')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('  col-start-1 row-start-3 col-span-2 border-l-4 border-b-4 border-blue-800 ')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(' col-start-3 row-start-2 row-span-2 border-r-4 border-b-4 border-yellow-800  ')
						]),
					_List_Nil)
				]))
		]);
};
var $author$project$HomeBoxes$greenHomeBoxes = _List_fromArray(
	[
		A2($author$project$HomeBoxes$homeBox, 'col-start-10 row-start-1', 1),
		A2($author$project$HomeBoxes$homeBox, 'col-start-13 row-start-1', 1),
		A2($author$project$HomeBoxes$homeBox, 'col-start-10 row-start-4', 1),
		A2($author$project$HomeBoxes$homeBox, 'col-start-13 row-start-4', 1)
	]);
var $author$project$HomeBoxes$redHomeBoxes = _List_fromArray(
	[
		A2($author$project$HomeBoxes$homeBox, 'col-start-1 row-start-1', 0),
		A2($author$project$HomeBoxes$homeBox, 'col-start-4 row-start-1', 0),
		A2($author$project$HomeBoxes$homeBox, 'col-start-1 row-start-4', 0),
		A2($author$project$HomeBoxes$homeBox, 'col-start-4 row-start-4', 0)
	]);
var $author$project$HomeBoxes$yellowHomeBoxes = _List_fromArray(
	[
		A2($author$project$HomeBoxes$homeBox, 'col-start-10 row-start-10', 3),
		A2($author$project$HomeBoxes$homeBox, 'col-start-13 row-start-10', 3),
		A2($author$project$HomeBoxes$homeBox, 'col-start-10 row-start-13', 3),
		A2($author$project$HomeBoxes$homeBox, 'col-start-13 row-start-13', 3)
	]);
var $author$project$HomeBoxes$homeBoxes = function (model) {
	return _Utils_ap(
		$author$project$HomeBoxes$colorHomeBoxes(model),
		_Utils_ap(
			$author$project$HomeBoxes$redHomeBoxes,
			_Utils_ap(
				$author$project$HomeBoxes$blueHomeBoxes,
				_Utils_ap($author$project$HomeBoxes$greenHomeBoxes, $author$project$HomeBoxes$yellowHomeBoxes))));
};
var $elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var $author$project$HomeCells$getPositionsInStartBox = F3(
	function (model, colorToGet, n) {
		return A2(
			$elm_community$list_extra$List$Extra$find,
			function (posInfo) {
				var _v0 = posInfo;
				var color = _v0.a;
				var pos = _v0.b;
				return _Utils_eq(colorToGet, color) && function () {
					if (pos.$ === 1) {
						var num = pos.a;
						return _Utils_eq(num, n);
					} else {
						return false;
					}
				}();
			},
			model.aJ);
	});
var $author$project$HomeCells$clickOrHiddenAttribute = F4(
	function (model, color, num, classNames) {
		var _v0 = A3($author$project$HomeCells$getPositionsInStartBox, model, color, num);
		if (_v0.$ === 1) {
			return _List_fromArray(
				[
					$elm$html$Html$Attributes$hidden(true),
					$elm$html$Html$Attributes$class(classNames)
				]);
		} else {
			var posInfo = _v0.a;
			return (_Utils_eq(model.aM, model.aT.ax) && A2($author$project$Ludo$canMove, model, posInfo)) ? _List_fromArray(
				[
					$elm$html$Html$Events$onClick(
					$author$project$LudoModel$MakeMove(
						$author$project$LudoModel$InStartBoxPosition(num))),
					$elm$html$Html$Attributes$class(classNames + '  animate__animated animate__heartBeat animate__infinite ')
				]) : _List_fromArray(
				[
					$elm$html$Html$Attributes$class(classNames)
				]);
		}
	});
var $author$project$Coin$coinSvg = function (_class) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$viewBox('0 0 100 100'),
				$elm$svg$Svg$Attributes$class('w-full h-full text-red-700')
			]),
		_List_fromArray(
			[
				A2($author$project$Coin$coin, _class, 0)
			]));
};
var $author$project$HomeCells$blueHomeCells = function (model) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 2, 1, ' col-start-2 row-start-11  align-middle'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('blue')
				])),
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 2, 2, ' col-start-5 row-start-11  align-middle'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('blue')
				])),
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 2, 3, ' col-start-5 row-start-14  align-middle'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('blue')
				])),
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 2, 4, ' col-start-2 row-start-14 align-middle '),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('blue')
				]))
		]);
};
var $author$project$HomeCells$greenHomeCells = function (model) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 1, 1, ' col-start-11 row-start-2 align-middle'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('green')
				])),
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 1, 2, ' col-start-14 row-start-2 align-middle'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('green')
				])),
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 1, 3, ' col-start-14 row-start-5 align-middle'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('green')
				])),
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 1, 4, ' col-start-11 row-start-5 align-middle'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('green')
				]))
		]);
};
var $author$project$HomeCells$redHomeCells = function (model) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 0, 1, ' col-start-2 row-start-2 align-middle text-center'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('red')
				])),
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 0, 2, ' col-start-5 row-start-2 align-middle text-center'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('red')
				])),
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 0, 3, ' col-start-5 row-start-5 align-middle text-center'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('red')
				])),
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 0, 4, ' col-start-2 row-start-5 align-middle text-center'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('red')
				]))
		]);
};
var $author$project$HomeCells$yellowHomeCells = function (model) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 3, 1, ' col-start-11 row-start-11 align-middle'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('yellow')
				])),
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 3, 2, ' col-start-14 row-start-11 align-middle'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('yellow')
				])),
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 3, 3, ' col-start-14 row-start-14 align-middle'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('yellow')
				])),
			A2(
			$elm$html$Html$button,
			A4($author$project$HomeCells$clickOrHiddenAttribute, model, 3, 4, ' col-start-11 row-start-14 align-middle'),
			_List_fromArray(
				[
					$author$project$Coin$coinSvg('yellow')
				]))
		]);
};
var $author$project$HomeCells$homeCells = function (model) {
	return _Utils_ap(
		$author$project$HomeCells$redHomeCells(model),
		_Utils_ap(
			$author$project$HomeCells$greenHomeCells(model),
			_Utils_ap(
				$author$project$HomeCells$blueHomeCells(model),
				$author$project$HomeCells$yellowHomeCells(model))));
};
var $author$project$Game$gridHtml = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid  text-center  grid-cols-15  grid-rows-15 m-auto md:p-3  h-wscreen w-screen lg:h-screen lg:w-hscreen text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl')
			]),
		_Utils_ap(
			$author$project$CommonPath$commonPath(model),
			_Utils_ap(
				$author$project$HomeBoxes$homeBoxes(model),
				_Utils_ap(
					$author$project$Game$endPath(model),
					A2(
						$elm$core$List$cons,
						$author$project$Dice$diceDiv(model),
						$author$project$HomeCells$homeCells(model))))));
};
var $author$project$Game$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('my-8  text-center text-white')
					]),
				_List_fromArray(
					[
						$author$project$Game$gridHtml(model)
					]))
			]));
};
var $author$project$Game$main = $elm$browser$Browser$element(
	{aC: $author$project$Game$init, aQ: $author$project$Game$subscriptions, aU: $author$project$LudoUpdate$update, aV: $author$project$Game$view});
_Platform_export({'Game':{'init':$author$project$Game$main(
	$elm$json$Json$Decode$succeed(0))(0)}});}(this));