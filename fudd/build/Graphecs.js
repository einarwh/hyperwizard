Elm.Graphecs = Elm.Graphecs || {};
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