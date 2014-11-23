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