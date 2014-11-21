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
   var b = A3($Graphics$Input.button,
   binput.handle,
   {ctor: "_Tuple0"},
   "beep");
   var bodyFrom = function (d) {
      return function () {
         var foo = function (l) {
            return A2($List.map,
            function (_v0) {
               return function () {
                  switch (_v0.ctor)
                  {case "_Tuple2":
                     return $List.concat(_L.fromArray([_v0._0
                                                      ,"="
                                                      ,_v0._1.string]));}
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
             ,_0: field
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
   var liink = F3(function (href,
   ref,
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
         var link = F2(function (href,
         text) {
            return A3(liink,
            href,
            ref,
            text);
         });
         var foo = function (_v6) {
            return function () {
               switch (_v6.ctor)
               {case "_Tuple2":
                  return function () {
                       switch (_v6._0)
                       {case "Location":
                          return {ctor: "_Tuple2"
                                 ,_0: $Text.plainText("Location: ")
                                 ,_1: A2(link,_v6._1,_v6._1)};}
                       return {ctor: "_Tuple2"
                              ,_0: $Text.plainText($List.concat(_L.fromArray([_v6._0
                                                                             ,": "])))
                              ,_1: $Text.plainText(_v6._1)};
                    }();}
               _E.Case($moduleName,
               "between lines 111 and 114");
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
         var relToString = function (l) {
            return A3($List.foldl,
            F2(function (j,r) {
               return function () {
                  var _v11 = {ctor: "_Tuple2"
                             ,_0: j
                             ,_1: r};
                  switch (_v11.ctor)
                  {case "_Tuple2":
                     switch (_v11._0.ctor)
                       {case "String":
                          switch (_v11._1.ctor)
                            {case "Just":
                               return $Maybe.Just($List.concat(_L.fromArray([_v11._1._0
                                                                            ," "
                                                                            ,_v11._0._0])));}
                            break;}
                       break;}
                  return $Maybe.Nothing;
               }();
            }),
            $Maybe.Just(""),
            l);
         };
         var link = F2(function (h,j) {
            return A3($Graphecs.butt,
            handle,
            $Maybe.Just(A2(getReq,
            $Maybe.Just(ref),
            h)),
            $Graphecs.renderJson(j));
         });
         var relink = F2(function (h,l) {
            return function () {
               var _v16 = relToString(l);
               switch (_v16.ctor)
               {case "Just": return A3(liink,
                    h,
                    ref,
                    _v16._0);
                  case "Nothing": return A2(link,
                    h,
                    j);}
               _E.Case($moduleName,
               "between lines 124 and 127");
            }();
         });
         var rend = function (d) {
            return function () {
               var _v18 = {ctor: "_Tuple3"
                          ,_0: A2($Dict.get,"href",d)
                          ,_1: A2($Dict.get,"title",d)
                          ,_2: A2($Dict.get,"rel",d)};
               switch (_v18.ctor)
               {case "_Tuple3":
                  switch (_v18._0.ctor)
                    {case "Just":
                       switch (_v18._0._0.ctor)
                         {case "String":
                            switch (_v18._1.ctor)
                              {case "Just":
                                 switch (_v18._1._0.ctor)
                                   {case "String": return A3(liink,
                                        _v18._0._0._0,
                                        ref,
                                        _v18._1._0._0);}
                                   break;}
                              switch (_v18._2.ctor)
                              {case "Just":
                                 switch (_v18._2._0.ctor)
                                   {case "Array": return A2(relink,
                                        _v18._0._0._0,
                                        _v18._2._0._0);}
                                   break;}
                              return A2(link,
                              _v18._0._0._0,
                              j);}
                         break;}
                    break;}
               return $Graphecs.renderJson(j);
            }();
         };
         return function () {
            switch (j.ctor)
            {case "Object":
               return rend(j._0);}
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
         var _v32 = A2($Dict.get,a,d);
         switch (_v32.ctor)
         {case "Just":
            switch (_v32._0.ctor)
              {case "Act":
                 return A3($Dict.insert,
                   a,
                   A2(Act,
                   _v32._0._0,
                   A3($Dict.insert,
                   f,
                   c,
                   _v32._0._1)),
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
         var _v36 = A2($Dict.get,a,d);
         switch (_v36.ctor)
         {case "Just":
            switch (_v36._0.ctor)
              {case "Act":
                 return A3($Dict.insert,
                   a,
                   A2(Act,
                   $Maybe.Just(m),
                   _v36._0._1),
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
            "between lines 69 and 73");
         }();
      });
      return A3($Signal.foldp,
      foo,
      $Dict.empty,
      A2($Signal.merge,
      actionFieldInp.signal,
      A2($Signal.lift,
      function (_v46) {
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
   _v48,
   d) {
      return function () {
         switch (_v48.ctor)
         {case "Act":
            return function () {
                 var method = function () {
                    var _v52 = {ctor: "_Tuple2"
                               ,_0: method1
                               ,_1: _v48._0};
                    switch (_v52.ctor)
                    {case "_Tuple2":
                       switch (_v52._0.ctor)
                         {case "Just":
                            return _v52._0._0;}
                         switch (_v52._1.ctor)
                         {case "Just":
                            return _v52._1._0;}
                         return "GET";}
                    _E.Case($moduleName,
                    "between lines 160 and 164");
                 }();
                 var button = A3($Graphics$Input.button,
                 handle,
                 $Maybe.Just(A4(req,
                 $Maybe.Just(ref),
                 href,
                 method,
                 bodyFrom(_v48._1))),
                 "boop");
                 var rendAct = function () {
                    switch (method1.ctor)
                    {case "Just": return button;
                       case "Nothing":
                       return A2($Graphics$Element.above,
                         A2($Graphics$Input.dropDown,
                         actionFieldInp.handle,
                         methods(name)),
                         button);}
                    _E.Case($moduleName,
                    "between lines 165 and 169");
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
                    _v48._1));
                 };
                 var rendField = function (f) {
                    return function () {
                       switch (f.ctor)
                       {case "Object":
                          return function () {
                               var _v61 = A2($Dict.get,
                               "name",
                               f._0);
                               switch (_v61.ctor)
                               {case "Just":
                                  switch (_v61._0.ctor)
                                    {case "String":
                                       return {ctor: "_Tuple2"
                                              ,_0: $Text.plainText($List.concat(_L.fromArray([_v61._0._0
                                                                                             ,": "])))
                                              ,_1: field(_v61._0._0)};}
                                    break;}
                               return {ctor: "_Tuple2"
                                      ,_0: $Text.plainText("???")
                                      ,_1: $Graphecs.renderJson(f)};
                            }();}
                       return {ctor: "_Tuple2"
                              ,_0: $Text.plainText("weird json :|")
                              ,_1: $Graphecs.renderJson(f)};
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
                 return A2($Graphics$Element.beside,
                 A2($Graphecs.renderJsonBut,
                 _L.fromArray([{ctor: "_Tuple2"
                               ,_0: "title"
                               ,_1: $Graphecs.renderJson}
                              ,{ctor: "_Tuple2"
                               ,_0: "name"
                               ,_1: $Graphecs.renderJson}
                              ,{ctor: "_Tuple2"
                               ,_0: "href"
                               ,_1: $Graphecs.renderJson}
                              ,{ctor: "_Tuple2"
                               ,_0: "method"
                               ,_1: $Graphecs.renderJson}
                              ,{ctor: "_Tuple2"
                               ,_0: "fields"
                               ,_1: rendFields}]),
                 $Json.Object(d)),
                 rendAct);
              }();}
         _E.Case($moduleName,
         "between lines 150 and 175");
      }();
   });
   var renderActions = F3(function (afs,
   ref,
   j) {
      return function () {
         var method = function (d) {
            return function () {
               var _v66 = A2($Dict.get,
               "method",
               d);
               switch (_v66.ctor)
               {case "Just":
                  switch (_v66._0.ctor)
                    {case "String":
                       return $Maybe.Just(_v66._0._0);}
                    break;}
               return $Maybe.Nothing;
            }();
         };
         var noAct = A2(Act,
         $Maybe.Nothing,
         $Dict.empty);
         var rendD = function (d) {
            return function () {
               var _v69 = {ctor: "_Tuple2"
                          ,_0: A2($Dict.get,"name",d)
                          ,_1: A2($Dict.get,"href",d)};
               switch (_v69.ctor)
               {case "_Tuple2":
                  switch (_v69._0.ctor)
                    {case "Just":
                       switch (_v69._0._0.ctor)
                         {case "String":
                            switch (_v69._1.ctor)
                              {case "Just":
                                 switch (_v69._1._0.ctor)
                                   {case "String":
                                      return A6(renderAction,
                                        _v69._0._0._0,
                                        _v69._1._0._0,
                                        method(d),
                                        ref,
                                        A3($Dict.getOrElse,
                                        noAct,
                                        _v69._0._0._0,
                                        afs),
                                        d);}
                                   break;}
                              break;}
                         break;}
                    break;}
               return $Graphecs.renderJson($Json.Object(d));
            }();
         };
         var rend = function (a) {
            return function () {
               switch (a.ctor)
               {case "Object":
                  return rendD(a._0);}
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
                                     ,_0: "properties"
                                     ,_1: $Graphecs.renderJsonBut(_L.fromArray([{ctor: "_Tuple2"
                                                                                ,_0: "name"
                                                                                ,_1: $Graphecs.renderJson}
                                                                               ,{ctor: "_Tuple2"
                                                                                ,_0: "description"
                                                                                ,_1: $Graphecs.renderJson}]))}
                                    ,{ctor: "_Tuple2"
                                     ,_0: "links"
                                     ,_1: renderLinks(ref)}
                                    ,{ctor: "_Tuple2"
                                     ,_0: "actions"
                                     ,_1: A2(renderActions,
                                     fs,
                                     ref)}]);
         return function () {
            var _v80 = $Json.fromString(s);
            switch (_v80.ctor)
            {case "Just":
               return A2($Graphecs.renderJsonBut,
                 renderl,
                 _v80._0);}
            return $Text.plainText($List.concat(_L.fromArray(["not soap? :() "
                                                             ,s])));
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
                        _L.fromArray([$Text.plainText($List.concat(_L.fromArray(["Status: "
                                                                                ,$String.show(x._0._1._0.status)
                                                                                ,", "
                                                                                ,x._0._1._0.statusText])))
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
         "between lines 93 and 98");
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
                      ,strToGUI: strToGUI
                      ,respToGUI: respToGUI
                      ,liink: liink
                      ,renderHeaders: renderHeaders
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
         var maxW = A3($List.foldl,
         F2(function (_v0,n) {
            return function () {
               switch (_v0.ctor)
               {case "_Tuple2":
                  return A2($Basics.max,
                    $Graphics$Element.widthOf(_v0._0),
                    n);}
               _E.Case($moduleName,
               "on line 36, column 45 to 62");
            }();
         }),
         0,
         l);
         var foo = function (_v4) {
            return function () {
               switch (_v4.ctor)
               {case "_Tuple2":
                  return A2($Graphics$Element.beside,
                    A2(leftAl,maxW,_v4._0),
                    _v4._1);}
               _E.Case($moduleName,
               "on line 37, column 33 to 59");
            }();
         };
         return A2($Graphics$Element.flow,
         $Graphics$Element.down,
         A2($List.map,
         spacey,
         A2($List.map,foo,l)));
      }();
   };
   var bordered = F2(function (c,
   e) {
      return A2(spacec,
      c,
      spacey(e));
   });
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
                 var _v14 = renderD(x._0);
                 switch (_v14.ctor)
                 {case "[]":
                    return $Graphics$Element.empty;}
                 return A2(bordered,
                 $Color.darkGrey,
                 renderKV(_v14));
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
         "between lines 20 and 29");
      }();
   };
   var renderD = function (d) {
      return function () {
         var render = function (_v15) {
            return function () {
               switch (_v15.ctor)
               {case "_Tuple2":
                  return {ctor: "_Tuple2"
                         ,_0: $Text.plainText($List.concat(_L.fromArray([_v15._0
                                                                        ,": "])))
                         ,_1: renderJson(_v15._1)};}
               _E.Case($moduleName,
               "on line 32, column 34 to 76");
            }();
         };
         return A2($List.map,
         render,
         $Dict.toList(d));
      }();
   };
   var renderJsonBut = F2(function (l,
   j) {
      return function () {
         var render = function (_v19) {
            return function () {
               switch (_v19.ctor)
               {case "_Tuple3":
                  return {ctor: "_Tuple2"
                         ,_0: $Text.plainText($List.concat(_L.fromArray([_v19._0
                                                                        ,": "])))
                         ,_1: _v19._1(_v19._2)};}
               _E.Case($moduleName,
               "on line 47, column 29 to 62");
            }();
         };
         var consDKV = F3(function (d,
         _v24,
         kvs) {
            return function () {
               switch (_v24.ctor)
               {case "_Tuple2":
                  return function () {
                       var _v28 = A2($Dict.get,
                       _v24._0,
                       d);
                       switch (_v28.ctor)
                       {case "Just":
                          return A2($List._op["::"],
                            {ctor: "_Tuple3"
                            ,_0: _v24._0
                            ,_1: _v24._1
                            ,_2: _v28._0},
                            kvs);
                          case "Nothing": return kvs;}
                       _E.Case($moduleName,
                       "between lines 43 and 46");
                    }();}
               _E.Case($moduleName,
               "between lines 43 and 46");
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
               return A2(bordered,
                 $Color.darkGray,
                 renderKV($List.concat(_L.fromArray([A2($List.map,
                                                    render,
                                                    A2(keyVals,j._0,l))
                                                    ,renderD(A2(remove,
                                                    j._0,
                                                    l))]))));}
            return renderJson(j);
         }();
      }();
   });
   var butt = F3(function (h,v,e) {
      return A5($Graphics$Input.customButton,
      h,
      v,
      A2(bordered,$Color.lightBlue,e),
      A2(bordered,$Color.blue,e),
      A2(bordered,$Color.darkBlue,e));
   });
   _elm.Graphecs.values = {_op: _op
                          ,spacec: spacec
                          ,spacey: spacey
                          ,bordered: bordered
                          ,renderJson: renderJson
                          ,renderD: renderD
                          ,renderKV: renderKV
                          ,renderJsonBut: renderJsonBut
                          ,butt: butt
                          ,makeField: makeField
                          ,centered: centered
                          ,leftAl: leftAl};
   return _elm.Graphecs.values;
};