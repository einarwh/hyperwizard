Elm.Ting = Elm.Ting || {};
Elm.Ting.make = function (_elm) {
   "use strict";
   _elm.Ting = _elm.Ting || {};
   if (_elm.Ting.values)
   return _elm.Ting.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Ting",
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $Graphecs = Elm.Graphecs.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $Graphics$Input = Elm.Graphics.Input.make(_elm),
   $Graphics$Input$Field = Elm.Graphics.Input.Field.make(_elm),
   $Json = Elm.Json.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Json = Elm.Native.Json.make(_elm),
   $Native$Ports = Elm.Native.Ports.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm),
   $Text = Elm.Text.make(_elm),
   $Window = Elm.Window.make(_elm);
   var relToString = function (l) {
      return function () {
         var foo = F2(function (j,r) {
            return function () {
               var _v0 = {ctor: "_Tuple2"
                         ,_0: j
                         ,_1: r};
               switch (_v0.ctor)
               {case "_Tuple2":
                  switch (_v0._0.ctor)
                    {case "String":
                       switch (_v0._1.ctor)
                         {case "Just": switch (_v0._1._0)
                              {case "":
                                 return $Maybe.Just(_v0._0._0);}
                              return $Maybe.Just($List.concat(_L.fromArray([_v0._1._0
                                                                           ," "
                                                                           ,_v0._0._0])));}
                         break;}
                    break;}
               return $Maybe.Nothing;
            }();
         });
         return A3($List.foldl,
         foo,
         $Maybe.Just(""),
         l);
      }();
   };
   var rendStatus = function (r) {
      return function () {
         var ls = $Text.plainText($List.concat(_L.fromArray(["Status: "
                                                            ,$String.show(r.status)
                                                            ,", "])));
         var ott = A3($Graphics$Element.fittedImage,
         100,
         100,
         "sea-otter.jpg");
         var rs = _U.eq(r.status,
         303) ? ott : $Text.plainText(r.statusText);
         return A2($Graphics$Element.beside,
         A4($Graphics$Element.container,
         $Graphics$Element.widthOf(ls),
         $Graphics$Element.heightOf(rs),
         $Graphics$Element.middle,
         ls),
         rs);
      }();
   };
   var renderTitle = function (j) {
      return function () {
         switch (j.ctor)
         {case "String":
            return $Graphecs.Only($Text.leftAligned($Text.bold(A2($Text.height,
              14,
              $Text.toText(j._0)))));}
         return $Graphecs.Labeled($Graphecs.renderJson(j));
      }();
   };
   var renderJBut = function (l) {
      return function ($) {
         return $Graphecs.Labeled($Graphecs.renderJsonBut(l)($));
      };
   };
   var renderJ = function ($) {
      return $Graphecs.Labeled($Graphecs.renderJson($));
   };
   var inn = $Native$Ports.portIn("inn",
   $Native$Ports.incomingSignal(function (v) {
      return v === null ? $Maybe.Nothing : $Maybe.Just(_U.isJSArray(v) ? {ctor: "_Tuple2"
                                                                         ,_0: typeof v[0] === "object" && "url" in v[0] && "verb" in v[0] && "headers" in v[0] && "body" in v[0] ? {_: {}
                                                                                                                                                                                   ,url: typeof v[0].url === "string" || typeof v[0].url === "object" && v[0].url instanceof String ? v[0].url : _E.raise("invalid input, expecting JSString but got " + v[0].url)
                                                                                                                                                                                   ,verb: typeof v[0].verb === "string" || typeof v[0].verb === "object" && v[0].verb instanceof String ? v[0].verb : _E.raise("invalid input, expecting JSString but got " + v[0].verb)
                                                                                                                                                                                   ,headers: _U.isJSArray(v[0].headers) ? _L.fromArray(v[0].headers.map(function (v) {
                                                                                                                                                                                      return _U.isJSArray(v) ? {ctor: "_Tuple2"
                                                                                                                                                                                                               ,_0: typeof v[0] === "string" || typeof v[0] === "object" && v[0] instanceof String ? v[0] : _E.raise("invalid input, expecting JSString but got " + v[0])
                                                                                                                                                                                                               ,_1: typeof v[1] === "string" || typeof v[1] === "object" && v[1] instanceof String ? v[1] : _E.raise("invalid input, expecting JSString but got " + v[1])} : _E.raise("invalid input, expecting JSArray but got " + v);
                                                                                                                                                                                   })) : _E.raise("invalid input, expecting JSArray but got " + v[0].headers)
                                                                                                                                                                                   ,body: typeof v[0].body === "string" || typeof v[0].body === "object" && v[0].body instanceof String ? v[0].body : _E.raise("invalid input, expecting JSString but got " + v[0].body)} : _E.raise("invalid input, expecting JSObject [\"url\",\"verb\",\"headers\",\"body\"] but got " + v[0])
                                                                         ,_1: v[1] === null ? $Maybe.Nothing : $Maybe.Just(typeof v[1] === "object" && "url" in v[1] && "body" in v[1] && "status" in v[1] && "statusText" in v[1] && "headers" in v[1] ? {_: {}
                                                                                                                                                                                                                                                          ,url: typeof v[1].url === "string" || typeof v[1].url === "object" && v[1].url instanceof String ? v[1].url : _E.raise("invalid input, expecting JSString but got " + v[1].url)
                                                                                                                                                                                                                                                          ,body: typeof v[1].body === "string" || typeof v[1].body === "object" && v[1].body instanceof String ? v[1].body : _E.raise("invalid input, expecting JSString but got " + v[1].body)
                                                                                                                                                                                                                                                          ,status: typeof v[1].status === "number" ? v[1].status : _E.raise("invalid input, expecting JSNumber but got " + v[1].status)
                                                                                                                                                                                                                                                          ,statusText: typeof v[1].statusText === "string" || typeof v[1].statusText === "object" && v[1].statusText instanceof String ? v[1].statusText : _E.raise("invalid input, expecting JSString but got " + v[1].statusText)
                                                                                                                                                                                                                                                          ,headers: _U.isJSArray(v[1].headers) ? _L.fromArray(v[1].headers.map(function (v) {
                                                                                                                                                                                                                                                             return _U.isJSArray(v) ? {ctor: "_Tuple2"
                                                                                                                                                                                                                                                                                      ,_0: typeof v[0] === "string" || typeof v[0] === "object" && v[0] instanceof String ? v[0] : _E.raise("invalid input, expecting JSString but got " + v[0])
                                                                                                                                                                                                                                                                                      ,_1: typeof v[1] === "string" || typeof v[1] === "object" && v[1] instanceof String ? v[1] : _E.raise("invalid input, expecting JSString but got " + v[1])} : _E.raise("invalid input, expecting JSArray but got " + v);
                                                                                                                                                                                                                                                          })) : _E.raise("invalid input, expecting JSArray but got " + v[1].headers)} : _E.raise("invalid input, expecting JSObject [\"url\",\"body\",\"status\",\"statusText\",\"headers\"] but got " + v[1]))} : _E.raise("invalid input, expecting JSArray but got " + v));
   }));
   var binput = $Graphics$Input.input({ctor: "_Tuple0"});
   var b = A2($Graphics$Element.width,
   80,
   A2($Graphics$Element.height,
   20,
   A3($Graphics$Input.button,
   binput.handle,
   {ctor: "_Tuple0"},
   "GET")));
   var jsonGet = F2(function (j,
   s) {
      return function () {
         switch (j.ctor)
         {case "Object":
            return A2($Dict.get,s,j._0);}
         return $Maybe.Nothing;
      }();
   });
   var bodyFrom = function (d) {
      return function () {
         var foo = function (l) {
            return A2($List.map,
            function (_v9) {
               return function () {
                  switch (_v9.ctor)
                  {case "_Tuple2":
                     return $List.concat(_L.fromArray([_v9._0
                                                      ,"="
                                                      ,_v9._1.string]));}
                  _E.Case($moduleName,
                  "on line 38, column 33 to 57");
               }();
            },
            l);
         };
         return A2($List.join,
         "&",
         foo($Dict.toList(d)));
      }();
   };
   var req = F4(function (r,
   u,
   v,
   b) {
      return function () {
         var dhs = _L.fromArray([{ctor: "_Tuple2"
                                 ,_0: "Content-type"
                                 ,_1: "application/x-www-form-urlencoded"}
                                ,{ctor: "_Tuple2"
                                 ,_0: "accept"
                                 ,_1: "application/vnd.siren+json"}]);
         var hs = function () {
            switch (r.ctor)
            {case "Just":
               return A2($List._op["::"],
                 {ctor: "_Tuple2"
                 ,_0: "X-Alt-Referer"
                 ,_1: r._0},
                 dhs);
               case "Nothing": return dhs;}
            _E.Case($moduleName,
            "between lines 31 and 34");
         }();
         return {_: {}
                ,body: b
                ,headers: hs
                ,url: u
                ,verb: v};
      }();
   });
   var getReq = F2(function (r,u) {
      return A4(req,r,u,"GET","");
   });
   var things = function () {
      var inp = $Graphics$Input.input($Maybe.Nothing);
      var addr = "http://hyperwizard.azurewebsites.net/hywit/void";
      var $ = A2($Graphecs.makeField,
      "Thing",
      addr),
      field = $._0,
      content = $._1;
      var fieldSig = A2($Signal.sampleOn,
      binput.signal,
      content);
      var fieldReqSig = A2($Signal.lift,
      function ($) {
         return $Maybe.Just(getReq($Maybe.Nothing)(function (_) {
            return _.string;
         }($)));
      },
      fieldSig);
      var reqSig = A2($Signal.merge,
      fieldReqSig,
      inp.signal);
      return {ctor: "_Tuple3"
             ,_0: A2($Signal.lift,
             $Graphics$Element.width(400),
             field)
             ,_1: inp.handle
             ,_2: reqSig};
   }();
   var $ = things,
   field = $._0,
   handle = $._1,
   reqSig = $._2;
   var out = $Native$Ports.portOut("out",
   $Native$Ports.outgoingSignal(function (v) {
      return v.ctor === "Nothing" ? null : {url: v._0.url
                                           ,verb: v._0.verb
                                           ,headers: _L.toArray(v._0.headers).map(function (v) {
                                              return [v._0,v._1];
                                           })
                                           ,body: v._0.body};
   }),
   reqSig);
   var liink = F3(function (ref,
   href,
   s) {
      return function () {
         var t = $Text.toText(s);
         return A5($Graphics$Input.customButton,
         handle,
         $Maybe.Just(A2(getReq,
         $Maybe.Just(ref),
         href)),
         $Text.leftAligned(A2($Text.color,
         $Color.lightBlue,
         t)),
         $Text.leftAligned(A2($Text.color,
         $Color.blue,
         t)),
         $Text.leftAligned(A2($Text.color,
         $Color.darkBlue,
         t)));
      }();
   });
   var renderHeaders = F2(function (ref,
   hs) {
      return function () {
         var foo = function (_v15) {
            return function () {
               switch (_v15.ctor)
               {case "_Tuple2":
                  return function () {
                       switch (_v15._0)
                       {case "Location":
                          return {ctor: "_Tuple2"
                                 ,_0: _v15._0
                                 ,_1: $Graphecs.Labeled(A3(liink,
                                 ref,
                                 _v15._1,
                                 _v15._1))};}
                       return {ctor: "_Tuple2"
                              ,_0: _v15._0
                              ,_1: $Graphecs.Labeled($Text.plainText(_v15._1))};
                    }();}
               _E.Case($moduleName,
               "between lines 132 and 135");
            }();
         };
         return $Graphecs.renderKV(A2($List.map,
         foo,
         hs));
      }();
   });
   var renderLink = F2(function (ref,
   j) {
      return function () {
         var text = function (h) {
            return function () {
               var _v20 = {ctor: "_Tuple2"
                          ,_0: A2(jsonGet,j,"title")
                          ,_1: A2(jsonGet,j,"rel")};
               switch (_v20.ctor)
               {case "_Tuple2":
                  switch (_v20._0.ctor)
                    {case "Just":
                       switch (_v20._0._0.ctor)
                         {case "String":
                            return _v20._0._0._0;}
                         break;}
                    switch (_v20._1.ctor)
                    {case "Just":
                       switch (_v20._1._0.ctor)
                         {case "Array":
                            return function () {
                                 var _v27 = relToString(_v20._1._0._0);
                                 switch (_v27.ctor)
                                 {case "Just": return _v27._0;}
                                 return h;
                              }();}
                         break;}
                    break;}
               return h;
            }();
         };
         var rendLink = function (h) {
            return A3(liink,
            ref,
            h,
            text(h));
         };
         var rendImg = function (h) {
            return A2($Graphecs.bordered,
            $Color.darkGray,
            A2($Graphics$Element.above,
            $Text.leftAligned(A2($Text.link,
            h,
            $Text.toText(text(h)))),
            A3($Graphics$Element.fittedImage,
            400,
            400,
            h)));
         };
         return function () {
            var _v29 = {ctor: "_Tuple2"
                       ,_0: A2(jsonGet,j,"href")
                       ,_1: A2(jsonGet,j,"type")};
            switch (_v29.ctor)
            {case "_Tuple2":
               switch (_v29._0.ctor)
                 {case "Just":
                    switch (_v29._0._0.ctor)
                      {case "String":
                         switch (_v29._1.ctor)
                           {case "Just":
                              switch (_v29._1._0.ctor)
                                {case "String":
                                   return _U.eq(A3($String.slice,
                                     0,
                                     6,
                                     _v29._1._0._0),
                                     "image/") ? rendImg(_v29._0._0._0) : rendLink(_v29._0._0._0);}
                                break;}
                           return rendLink(_v29._0._0._0);}
                      break;}
                 break;}
            return $Graphecs.renderJson(j);
         }();
      }();
   });
   var renderLinks = F2(function (ref,
   j) {
      return function () {
         switch (j.ctor)
         {case "Array":
            return A2($Graphics$Element.flow,
              $Graphics$Element.down,
              A2($List.map,
              renderLink(ref),
              j._0));}
         return $Graphecs.renderJson(j);
      }();
   });
   var Act = F2(function (a,b) {
      return {ctor: "Act"
             ,_0: a
             ,_1: b};
   });
   var insField = F4(function (a,
   f,
   c,
   d) {
      return function () {
         var _v38 = A2($Dict.get,a,d);
         switch (_v38.ctor)
         {case "Just":
            switch (_v38._0.ctor)
              {case "Act":
                 return A3($Dict.insert,
                   a,
                   A2(Act,
                   _v38._0._0,
                   A3($Dict.insert,
                   f,
                   c,
                   _v38._0._1)),
                   d);}
              break;}
         return A3($Dict.insert,
         a,
         A2(Act,
         $Maybe.Nothing,
         A2($Dict.singleton,f,c)),
         d);
      }();
   });
   var insMethod = F3(function (a,
   m,
   d) {
      return function () {
         var _v42 = A2($Dict.get,a,d);
         switch (_v42.ctor)
         {case "Just":
            switch (_v42._0.ctor)
              {case "Act":
                 return A3($Dict.insert,
                   a,
                   A2(Act,
                   $Maybe.Just(m),
                   _v42._0._1),
                   d);}
              break;}
         return A3($Dict.insert,
         a,
         A2(Act,
         $Maybe.Just(m),
         $Dict.empty),
         d);
      }();
   });
   var Reset = {ctor: "Reset"};
   var actionFieldInp = $Graphics$Input.input(Reset);
   var actionFieldSig = function () {
      var foo = F2(function (x,d) {
         return function () {
            switch (x.ctor)
            {case "Reset":
               return $Dict.empty;
               case "UField":
               return A4(insField,
                 x._0,
                 x._1,
                 x._2,
                 d);
               case "UMethod":
               return A3(insMethod,
                 x._0,
                 x._1,
                 d);}
            _E.Case($moduleName,
            "between lines 74 and 78");
         }();
      });
      return A3($Signal.foldp,
      foo,
      $Dict.empty,
      A2($Signal.merge,
      actionFieldInp.signal,
      A2($Signal.lift,
      function (_v52) {
         return function () {
            return Reset;
         }();
      },
      reqSig)));
   }();
   var UMethod = F2(function (a,
   b) {
      return {ctor: "UMethod"
             ,_0: a
             ,_1: b};
   });
   var methods = function (a) {
      return _L.fromArray([{ctor: "_Tuple2"
                           ,_0: "GET"
                           ,_1: A2(UMethod,a,"GET")}
                          ,{ctor: "_Tuple2"
                           ,_0: "PUT"
                           ,_1: A2(UMethod,a,"PUT")}
                          ,{ctor: "_Tuple2"
                           ,_0: "POST"
                           ,_1: A2(UMethod,a,"POST")}
                          ,{ctor: "_Tuple2"
                           ,_0: "DELETE"
                           ,_1: A2(UMethod,a,"DELETE")}
                          ,{ctor: "_Tuple2"
                           ,_0: "PATCH"
                           ,_1: A2(UMethod,a,"PATCH")}]);
   };
   var UField = F3(function (a,
   b,
   c) {
      return {ctor: "UField"
             ,_0: a
             ,_1: b
             ,_2: c};
   });
   var renderAction = F6(function (name,
   href,
   method1,
   ref,
   _v54,
   j) {
      return function () {
         switch (_v54.ctor)
         {case "Act":
            return function () {
                 var drop = A2($Graphics$Element.width,
                 80,
                 A2($Graphics$Element.height,
                 20,
                 A2($Graphics$Input.dropDown,
                 actionFieldInp.handle,
                 methods(name))));
                 var method = function () {
                    var _v58 = {ctor: "_Tuple2"
                               ,_0: method1
                               ,_1: _v54._0};
                    switch (_v58.ctor)
                    {case "_Tuple2":
                       switch (_v58._0.ctor)
                         {case "Just":
                            return _v58._0._0;}
                         switch (_v58._1.ctor)
                         {case "Just":
                            return _v58._1._0;}
                         return "GET";}
                    _E.Case($moduleName,
                    "between lines 187 and 191");
                 }();
                 var button = A2($Graphics$Element.width,
                 80,
                 A2($Graphics$Element.height,
                 20,
                 A3($Graphics$Input.button,
                 handle,
                 $Maybe.Just(A4(req,
                 $Maybe.Just(ref),
                 href,
                 method,
                 bodyFrom(_v54._1))),
                 method)));
                 var renderedAct = function () {
                    switch (method1.ctor)
                    {case "Just": return button;
                       case "Nothing":
                       return A2($Graphics$Element.beside,
                         drop,
                         button);}
                    _E.Case($moduleName,
                    "between lines 201 and 204");
                 }();
                 var content = A2($Graphics$Input$Field.Content,
                 "",
                 A3($Graphics$Input$Field.Selection,
                 0,
                 0,
                 $Graphics$Input$Field.Forward));
                 var field = function (s) {
                    return A5($Graphics$Input$Field.field,
                    $Graphics$Input$Field.defaultStyle,
                    actionFieldInp.handle,
                    A2(UField,name,s),
                    "",
                    A3($Dict.getOrElse,
                    content,
                    s,
                    _v54._1));
                 };
                 var rendField = function (f) {
                    return function () {
                       var _v65 = A2(jsonGet,
                       f,
                       "name");
                       switch (_v65.ctor)
                       {case "Just":
                          switch (_v65._0.ctor)
                            {case "String":
                               return {ctor: "_Tuple2"
                                      ,_0: _v65._0._0
                                      ,_1: $Graphecs.Labeled(field(_v65._0._0))};}
                            break;}
                       return {ctor: "_Tuple2"
                              ,_0: ""
                              ,_1: $Graphecs.Only($Graphecs.renderJson(f))};
                    }();
                 };
                 var rendFields = function (fs) {
                    return function () {
                       switch (fs.ctor)
                       {case "Array":
                          return A2($Graphecs.bordered,
                            $Color.lightGrey,
                            $Graphecs.renderKV(A2($List.map,
                            rendField,
                            fs._0)));}
                       return $Graphecs.renderJson(fs);
                    }();
                 };
                 var renderL = _L.fromArray([{ctor: "_Tuple2"
                                             ,_0: "title"
                                             ,_1: renderTitle}
                                            ,{ctor: "_Tuple2"
                                             ,_0: "name"
                                             ,_1: renderJ}
                                            ,{ctor: "_Tuple2"
                                             ,_0: "href"
                                             ,_1: renderJ}
                                            ,{ctor: "_Tuple2"
                                             ,_0: "method"
                                             ,_1: function (_v70) {
                                                return function () {
                                                   return $Graphecs.Only($Graphics$Element.empty);
                                                }();
                                             }}
                                            ,{ctor: "_Tuple2"
                                             ,_0: "fields"
                                             ,_1: function ($) {
                                                return $Graphecs.Labeled(rendFields($));
                                             }}]);
                 var rendered = function () {
                    var _v72 = A2($Graphecs.renderJsonHalp,
                    renderL,
                    j);
                    switch (_v72.ctor)
                    {case "Just":
                       return $Graphecs.renderKV(_v72._0);}
                    return $Graphecs.renderJson(j);
                 }();
                 return A2($Graphecs.bordered,
                 $Color.darkGray,
                 A2($Graphics$Element.above,
                 rendered,
                 A4($Graphics$Element.container,
                 $Graphics$Element.widthOf(rendered),
                 $Graphics$Element.heightOf(renderedAct) + 4,
                 $Graphics$Element.midRight,
                 renderedAct)));
              }();}
         _E.Case($moduleName,
         "between lines 179 and 208");
      }();
   });
   var renderActions = F3(function (afs,
   ref,
   j) {
      return function () {
         var method = function (a) {
            return function () {
               var _v74 = A2(jsonGet,
               a,
               "method");
               switch (_v74.ctor)
               {case "Just":
                  switch (_v74._0.ctor)
                    {case "String":
                       return $Maybe.Just(_v74._0._0);}
                    break;}
               return $Maybe.Nothing;
            }();
         };
         var noAct = A2(Act,
         $Maybe.Nothing,
         $Dict.empty);
         var rend = function (a) {
            return function () {
               var _v77 = {ctor: "_Tuple2"
                          ,_0: A2(jsonGet,a,"name")
                          ,_1: A2(jsonGet,a,"href")};
               switch (_v77.ctor)
               {case "_Tuple2":
                  switch (_v77._0.ctor)
                    {case "Just":
                       switch (_v77._0._0.ctor)
                         {case "String":
                            switch (_v77._1.ctor)
                              {case "Just":
                                 switch (_v77._1._0.ctor)
                                   {case "String":
                                      return A6(renderAction,
                                        _v77._0._0._0,
                                        _v77._1._0._0,
                                        method(a),
                                        ref,
                                        A3($Dict.getOrElse,
                                        noAct,
                                        _v77._0._0._0,
                                        afs),
                                        a);}
                                   break;}
                              break;}
                         break;}
                    break;}
               return $Graphecs.renderJson(a);
            }();
         };
         return function () {
            switch (j.ctor)
            {case "Array":
               return A2($Graphics$Element.flow,
                 $Graphics$Element.down,
                 A2($List.map,rend,j._0));}
            return $Graphecs.renderJson(j);
         }();
      }();
   });
   var strToGUI = F3(function (s,
   ref,
   fs) {
      return function () {
         var renderl = _L.fromArray([{ctor: "_Tuple2"
                                     ,_0: "title"
                                     ,_1: renderTitle}
                                    ,{ctor: "_Tuple2"
                                     ,_0: "properties"
                                     ,_1: renderJBut(_L.fromArray([{ctor: "_Tuple2"
                                                                   ,_0: "name"
                                                                   ,_1: renderJ}
                                                                  ,{ctor: "_Tuple2"
                                                                   ,_0: "description"
                                                                   ,_1: renderJ}]))}
                                    ,{ctor: "_Tuple2"
                                     ,_0: "links"
                                     ,_1: function ($) {
                                        return $Graphecs.Labeled(renderLinks(ref)($));
                                     }}
                                    ,{ctor: "_Tuple2"
                                     ,_0: "actions"
                                     ,_1: function ($) {
                                        return $Graphecs.Labeled(A2(renderActions,
                                        fs,
                                        ref)($));
                                     }}]);
         return function () {
            var _v86 = $Json.fromString(s);
            switch (_v86.ctor)
            {case "Just":
               return A2($Graphecs.renderJsonBut,
                 renderl,
                 _v86._0);}
            return function () {
               var e = $Text.plainText(s);
               return _U.cmp($Graphics$Element.widthOf(e),
               500) > 0 ? A2($Graphics$Element.width,
               500,
               e) : e;
            }();
         }();
      }();
   });
   var respToGUI = F2(function (x,
   fs) {
      return function () {
         switch (x.ctor)
         {case "Just": switch (x._0.ctor)
              {case "_Tuple2":
                 switch (x._0._1.ctor)
                   {case "Just":
                      return A2($Graphics$Element.flow,
                        $Graphics$Element.down,
                        _L.fromArray([rendStatus(x._0._1._0)
                                     ,A2(renderHeaders,
                                     x._0._1._0.url,
                                     x._0._1._0.headers)
                                     ,A3(strToGUI,
                                     x._0._1._0.body,
                                     x._0._1._0.url,
                                     fs)]));
                      case "Nothing":
                      return $Text.plainText("...");}
                   break;}
              break;
            case "Nothing":
            return $Graphics$Element.empty;}
         _E.Case($moduleName,
         "between lines 116 and 121");
      }();
   });
   var main = function () {
      var stuf = A3($Signal.lift2,
      respToGUI,
      inn,
      actionFieldSig);
      var hed = A2($Signal.lift,
      $Graphics$Element.flow($Graphics$Element.right),
      $Signal.combine(_L.fromArray([field
                                   ,$Signal.constant(b)])));
      return A2($Signal.lift,
      $Graphics$Element.flow($Graphics$Element.down),
      $Signal.combine(_L.fromArray([A3($Signal.lift2,
                                   $Graphecs.centered,
                                   $Window.width,
                                   hed)
                                   ,A3($Signal.lift2,
                                   $Graphecs.centered,
                                   $Window.width,
                                   stuf)])));
   }();
   var Response = F5(function (a,
   b,
   c,
   d,
   e) {
      return {_: {}
             ,body: b
             ,headers: e
             ,status: c
             ,statusText: d
             ,url: a};
   });
   var Request = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,body: d
             ,headers: c
             ,url: a
             ,verb: b};
   });
   _elm.Ting.values = {_op: _op
                      ,Request: Request
                      ,Response: Response
                      ,UField: UField
                      ,UMethod: UMethod
                      ,Reset: Reset
                      ,Act: Act
                      ,getReq: getReq
                      ,req: req
                      ,bodyFrom: bodyFrom
                      ,jsonGet: jsonGet
                      ,binput: binput
                      ,b: b
                      ,things: things
                      ,field: field
                      ,handle: handle
                      ,reqSig: reqSig
                      ,actionFieldInp: actionFieldInp
                      ,insField: insField
                      ,insMethod: insMethod
                      ,actionFieldSig: actionFieldSig
                      ,renderJ: renderJ
                      ,renderJBut: renderJBut
                      ,renderTitle: renderTitle
                      ,strToGUI: strToGUI
                      ,rendStatus: rendStatus
                      ,respToGUI: respToGUI
                      ,liink: liink
                      ,renderHeaders: renderHeaders
                      ,relToString: relToString
                      ,renderLink: renderLink
                      ,renderLinks: renderLinks
                      ,methods: methods
                      ,renderAction: renderAction
                      ,renderActions: renderActions
                      ,main: main};
   return _elm.Ting.values;
};Elm.Graphecs = Elm.Graphecs || {};
Elm.Graphecs.make = function (_elm) {
   "use strict";
   _elm.Graphecs = _elm.Graphecs || {};
   if (_elm.Graphecs.values)
   return _elm.Graphecs.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Graphecs",
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $Graphics$Input = Elm.Graphics.Input.make(_elm),
   $Graphics$Input$Field = Elm.Graphics.Input.Field.make(_elm),
   $Json = Elm.Json.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm),
   $Text = Elm.Text.make(_elm);
   var leftAl = F2(function (w,e) {
      return A4($Graphics$Element.container,
      w,
      $Graphics$Element.heightOf(e),
      $Graphics$Element.topLeft,
      e);
   });
   var centered = F2(function (w,
   e) {
      return A4($Graphics$Element.container,
      w,
      $Graphics$Element.heightOf(e),
      $Graphics$Element.midTop,
      e);
   });
   var makeField = F2(function (s,
   ss) {
      return function () {
         var content = $Graphics$Input.input(A2($Graphics$Input$Field.Content,
         ss,
         A3($Graphics$Input$Field.Selection,
         0,
         0,
         $Graphics$Input$Field.Forward)));
         var fi = A2($Signal.lift,
         A4($Graphics$Input$Field.field,
         $Graphics$Input$Field.defaultStyle,
         content.handle,
         $Basics.identity,
         s),
         content.signal);
         return {ctor: "_Tuple2"
                ,_0: fi
                ,_1: content.signal};
      }();
   });
   var spacec = F2(function (c,e) {
      return A2($Graphics$Element.color,
      c,
      A4($Graphics$Element.container,
      4 + $Graphics$Element.widthOf(e),
      4 + $Graphics$Element.heightOf(e),
      $Graphics$Element.middle,
      e));
   });
   var spacey = function (e) {
      return A2(spacec,
      $Color.white,
      e);
   };
   var renderKV = function (l) {
      return function () {
         var maxOf = F2(function (_v0,
         n) {
            return function () {
               switch (_v0.ctor)
               {case "_Tuple2":
                  return function () {
                       switch (_v0._1.ctor)
                       {case "Labeled":
                          return A2($Basics.max,
                            $Graphics$Element.widthOf(_v0._0),
                            n);}
                       return n;
                    }();}
               _E.Case($moduleName,
               "between lines 38 and 41");
            }();
         });
         var renderedL = A2($List.map,
         function (_v6) {
            return function () {
               switch (_v6.ctor)
               {case "_Tuple2":
                  return {ctor: "_Tuple2"
                         ,_0: $Text.plainText($List.concat(_L.fromArray([_v6._0
                                                                        ,":  "])))
                         ,_1: _v6._1};}
               _E.Case($moduleName,
               "on line 37, column 47 to 79");
            }();
         },
         l);
         var maxW = A3($List.foldl,
         maxOf,
         0,
         renderedL);
         var foo = function (_v10) {
            return function () {
               switch (_v10.ctor)
               {case "_Tuple2":
                  return function () {
                       switch (_v10._1.ctor)
                       {case "Labeled":
                          return A2($Graphics$Element.beside,
                            A2(leftAl,maxW,_v10._0),
                            _v10._1._0);
                          case "Only": return _v10._1._0;}
                       _E.Case($moduleName,
                       "between lines 42 and 45");
                    }();}
               _E.Case($moduleName,
               "between lines 42 and 45");
            }();
         };
         return A2($Graphics$Element.flow,
         $Graphics$Element.down,
         A2($List.map,
         spacey,
         A2($List.map,foo,renderedL)));
      }();
   };
   var bordered = F2(function (c,
   e) {
      return A2(spacec,
      c,
      spacey(e));
   });
   var butt = F3(function (h,v,e) {
      return A5($Graphics$Input.customButton,
      h,
      v,
      A2(bordered,$Color.lightBlue,e),
      A2(bordered,$Color.blue,e),
      A2(bordered,$Color.darkBlue,e));
   });
   var Only = function (a) {
      return {ctor: "Only",_0: a};
   };
   var Labeled = function (a) {
      return {ctor: "Labeled"
             ,_0: a};
   };
   var renderD = function (d) {
      return function () {
         var render = function (_v17) {
            return function () {
               switch (_v17.ctor)
               {case "_Tuple2":
                  return {ctor: "_Tuple2"
                         ,_0: _v17._0
                         ,_1: Labeled(renderJson(_v17._1))};}
               _E.Case($moduleName,
               "on line 33, column 34 to 59");
            }();
         };
         return A2($List.map,
         render,
         $Dict.toList(d));
      }();
   };
   var renderJson = function (x) {
      return function () {
         switch (x.ctor)
         {case "Array":
            return A2($Graphics$Element.flow,
              $Graphics$Element.down,
              A2($List.map,renderJson,x._0));
            case "Boolean":
            return $Text.plainText($String.show(x._0));
            case "Null":
            return $Text.plainText("null");
            case "Number":
            return $Text.plainText($String.show(x._0));
            case "Object":
            return function () {
                 var _v27 = renderD(x._0);
                 switch (_v27.ctor)
                 {case "[]":
                    return $Graphics$Element.empty;}
                 return A2(bordered,
                 $Color.darkGrey,
                 renderKV(_v27));
              }();
            case "String":
            return function () {
                 var e = $Text.plainText(x._0);
                 return _U.cmp($Graphics$Element.widthOf(e),
                 500) > 0 ? A2($Graphics$Element.width,
                 500,
                 e) : e;
              }();}
         _E.Case($moduleName,
         "between lines 21 and 30");
      }();
   };
   var renderJsonHalp = F2(function (l,
   j) {
      return function () {
         var render = function (_v28) {
            return function () {
               switch (_v28.ctor)
               {case "_Tuple3":
                  return {ctor: "_Tuple2"
                         ,_0: _v28._0
                         ,_1: _v28._1(_v28._2)};}
               _E.Case($moduleName,
               "on line 59, column 29 to 35");
            }();
         };
         var consDKV = F3(function (d,
         _v33,
         kvs) {
            return function () {
               switch (_v33.ctor)
               {case "_Tuple2":
                  return function () {
                       var _v37 = A2($Dict.get,
                       _v33._0,
                       d);
                       switch (_v37.ctor)
                       {case "Just":
                          return A2($List._op["::"],
                            {ctor: "_Tuple3"
                            ,_0: _v33._0
                            ,_1: _v33._1
                            ,_2: _v37._0},
                            kvs);
                          case "Nothing": return kvs;}
                       _E.Case($moduleName,
                       "between lines 55 and 58");
                    }();}
               _E.Case($moduleName,
               "between lines 55 and 58");
            }();
         });
         var keyVals = F2(function (d,
         kvs) {
            return A3($List.foldr,
            consDKV(d),
            _L.fromArray([]),
            kvs);
         });
         var remove = F2(function (d,
         kvs) {
            return A3($List.foldl,
            $Dict.remove,
            d,
            A2($List.map,$Basics.fst,kvs));
         });
         return function () {
            switch (j.ctor)
            {case "Object":
               return $Maybe.Just($List.concat(_L.fromArray([A2($List.map,
                                                            render,
                                                            A2(keyVals,j._0,l))
                                                            ,renderD(A2(remove,
                                                            j._0,
                                                            l))])));}
            return $Maybe.Nothing;
         }();
      }();
   });
   var renderJsonBut = F2(function (l,
   j) {
      return function () {
         var _v41 = A2(renderJsonHalp,
         l,
         j);
         switch (_v41.ctor)
         {case "Just":
            return A2(bordered,
              $Color.darkGray,
              renderKV(_v41._0));}
         return renderJson(j);
      }();
   });
   _elm.Graphecs.values = {_op: _op
                          ,Labeled: Labeled
                          ,Only: Only
                          ,spacec: spacec
                          ,spacey: spacey
                          ,bordered: bordered
                          ,renderJson: renderJson
                          ,renderD: renderD
                          ,renderKV: renderKV
                          ,renderJsonBut: renderJsonBut
                          ,renderJsonHalp: renderJsonHalp
                          ,butt: butt
                          ,makeField: makeField
                          ,centered: centered
                          ,leftAl: leftAl};
   return _elm.Graphecs.values;
};