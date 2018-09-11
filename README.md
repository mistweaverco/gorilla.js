![](icon.png)

gorilla.js - the only javascript utility library you'll ever need.



## Methods

  - [gorilla.adBlockEnabled](#gorillaadblockenabled)
  - [gorilla.after](#gorillaafter)
  - [gorilla.ajax](#gorillaajax)
  - [gorilla.append](#gorillappend)
  - [gorilla.attr](#gorillaattr)
  - [gorilla.before](#gorillabefore)
  - [gorilla.compareJSON](#gorillacomparejson)
  - [gorilla.create](#gorillacreate)
  - [gorilla.domready](#gorillaomready)
  - [gorilla.find](#gorillafind)
  - [gorilla.getUnixtime](#gorillagetunixtime)
  - [gorilla.getURLParams](#gorillageturlparams)
  - [gorilla.html](#gorillahtml)
  - [gorilla.loadCSS](#gorillaloadcss)
  - [gorilla.loadJS](#gorillaloadjs)
  - [gorilla.on](#gorillaon)
  - [gorilla.prepend](#gorillaprepend)
  - [gorilla.remove](#gorillaremove)



### gorilla.adBlockEnabled

Check if user is using an AdBlocker

```javascript
gorilla.adBlockEnabled(function(adBlockEnabled){
        window.console.log("Client " + ((adBlockEnabled) ? "is" : "isn't") + " using AdBlock");
});
```



### gorilla.after

Wrapper for appending elements `after` some element.

```javascript
var newListElement = gorilla.create("li")
        .attr("style", "color:red;").html("New List Element");
// Appends a new list element after the 3rd li found in the DOM
gorilla.find("li").get(2).after(newListElement);
```



### gorilla.ajax

Simple ajax request wrapper.

```javascript
gorilla.ajax({
        url: "/pokemon.json",
        method: "POST",
        cache: true,
        requestContentType: "application/x-www-form-urlencoded",
        headers: [
                {
                        key: "Foo",
                        value: "Moo"
                }
        ]
        params: {
                format: "json"
                query: "all"
        }
        cb: function( err, result ) {
                if (!err)
                        console.log(result);
        }
});
```



### gorilla.append

Wrapper for `appendChild`.

```javascript
var newListElement = gorilla.create("li")
        .attr("style", "color:red;").html("New List Element");
gorilla.find("ul").get(0).append(newListElement);
```



### gorilla.attr

Wrapper for `setAttribute` and `getAttribute`.

```javascript
// retrieve `href` value of first link
gorilla.find("a").get(0).attr("href")

// set href value of first link
gorilla.find("a").get(0).attr("href", "#foo");
```



### gorilla.before

Wrapper for `insertBefore`.

```javascript
var newFirstListElement = gorilla.create("li").html("First List Element");
// Insert `newFirstListElement` before the first `li` found.
gorilla.find("li").get(0).before(newFirstListElement);
```



### gorilla.compareJSON

Compares to JSON structures and returns either `true` if they are _identical_
in terms of properties, or `false` if they don't have each others properties.

```javascript
var json1 = {
        foo: true,
        moo: false
};

var json2 = {
        foo: true,
        moo: false
};

var json3 = {
        foo: true,
        moo: true
};

var json4 = {
        foo: false,
        moo: false
};

// This should return true, because they are seen as "equal"
console.log(gorilla.compareJSON(json1, json2);

// This should return false, because they lack have the same
// properties, but not the same values for each property
console.log(gorilla.compareJson(json3, json4);
```



### gorilla.create

Wrapper for `document.createElement`.

```javascript
gorilla.create("input")
        .attr("type", "text")
        .attr("placeholder", "E-Mail");
```



### gorilla.domready

Simple domready wrapper.

```javascript
gorilla.domready(function() {
        alert("dom is ready!");
});
```



### gorilla.find

Advanced `querySelectorAll` with attaching convenience methods to elements.
This method always returns an array of objects and you either need to use the
`get` method or the `find("selector")[3]` element by index method to get the
element.

```javascript
gorilla.find("ul").get(0)
        .find("li").get(2)
        .find("a").get(0)
        .on("click", function(evt) {
                evt.preventDefault();
                alert("click");
        });
```



### gorilla.getUnixtime

Returns the current UNIX-Timestamp.

```javascript
console.log(gorilla.getUnixtime());
```



### gorilla.getURLParams

Returns a URL params object.

```javascript
console.log(gorilla.getURLParams("index.php?param1=value1&param2=value2"));
```

Should return;

```json
{
        "param1": "value1",
        "param2": "value2"
}
```



### gorilla.html

Wrapper for `innerHTML`.

```javascript
gorilla.find("a").get(0).html("This is a Hyperlink.");
```



### gorilla.loadCSS

Easy to use CSS file loader.
Creates a `<link rel="stylesheet" href="">` tag and fires a callback function.

```javascript
gorilla.loadCSS("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/core.css", function(err, obj) {
        if (err)
                return console.log('error loading css file..');
        alert("all good..");
});
```

or multiple files at once..

```javascript
var cssfiles = [
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/core.css",
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.css"
];
var loaded = [];
gorilla.loadCSS(cssfiles, function(err, obj) {
        if (err)
                return console.log("error loading css file..");
        loaded.push(obj.src);
        if (cssfiles.length === loaded.length)
                alert("all files loaded..");
});
```



### gorilla.loadJS

Easy to use JavaScript file loader.
Create a `<script>` tag and fires a callback function.

```javascript
gorilla.loadJS("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/core.js", function(err, obj) {
        if (err)
                return console.log('error loading js file..');
        alert("all good..");
});
```

or multiple files at once..

```javascript
var jsfiles = [
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/core.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js"
];
var loaded = [];
gorilla.loadJS(jsfiles, function(err, obj) {
        if (err)
                return console.log("error loading js file..");
        loaded.push(obj.src);
        if (jsfiles.length === loaded.length)
                alert("all files loaded..");
});
```

### gorilla.on

Simple wrapper for addEventListener.
Each element that was returned by `gorilla.find` has a method `on` attached to
it.

```javascript
gorilla.find("a").get(0).on(function(evt) {
        evt.preventDefault();
        alert("click");
});
```



### gorilla.prepend

Wrapper for `insertBefore`.

```javascript
var newFirstListElement = gorilla.create("li").html("First List Element");
// Insert `newFirstListElement` before the first `li` found.
gorilla.find("li").get(0).prepend(newFirstListElement);
```



### gorilla.remove

Removes a node and all its children.

```javascript
// Removes the first li tag found
gorilla.find("li").get(0).remove();
```



## Credits

### Icon

[Icon](icon.png) (free for commercial use) made by [Martin Berube](https://twitter.com/imaginatoon).
