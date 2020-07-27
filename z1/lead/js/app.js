var app = angular.module("app", ["ngMessages", "ui.mask"]);
app.controller("formController", function(e) {
  e.data = {}, e.someSelected = function(t) {
    return !!t && Object.keys(t).some(function(e) {
      return t[e]
    })
  }, e.doTouched = function() {
    e.form.agreement.$setTouched()
  }
});
var _validFileExtensions = [".jpg", ".jpeg", ".png"];

function validateSingleInput(e) {
  var t = e;
  if (0 < t.length) for (var i = 0; i < _validFileExtensions.length; i++) {
    var n = _validFileExtensions[i];
    if (t.substr(t.length - n.length, n.length).toLowerCase() == n.toLowerCase()) return !1
  }
  return !0
}

function onSubmit(e) {
  hasClass(document.getElementById("form-question"), "form--tabs") && $(formv).parents(".tab-pane")[0].classList.add("submit-success")
}

function onSubmitAlt(e) {
  var t = document.getElementById("form-question-alt");
  hasClass(t, "form--modal") && $(t).parents(".modal-content")[0].classList.add("submit-success")
}

function getTimeRemaining(e) {
  var t = Date.parse(e) - Date.parse(new Date), i = Math.floor(t / 1e3 % 60), n = Math.floor(t / 1e3 / 60 % 60),
    a = Math.floor(t / 36e5 % 24);
  return {total: t, days: Math.floor(t / 864e5), hours: a, minutes: n, seconds: i}
}

function initializeClock(e, t) {
  var i = $(e), n = i.find(".days"), a = i.find(".hours"), o = i.find(".minutes"), s = i.find(".seconds");

  function l() {
    var e = getTimeRemaining(t);
    n.html(e.days), a.html(("0" + e.hours).slice(-2)), o.html(("0" + e.minutes).slice(-2)), s.html(("0" + e.seconds).slice(-2)), e.total <= 0 && clearInterval(c)
  }

  l();
  var c = setInterval(l, 1e3)
}

app.directive("validFile", function() {
  return {
    require: "ngModel", link: function(e, n, t, a) {
      n.bind("change", function() {
        e.$apply(function() {
          var e = $(n), t = e.parents(".upload-group").find(".upload--success").length;
          if (n[0].files.length > n[0].dataset.max - t) a.$setValidity("quantity", !1); else {
            a.$setValidity("quantity", !0);
            for (var i = 0; i < n[0].files.length; i++) validateSingleInput(n[0].files[i].name) ? (e.val(""), a.$setValidity("extension", !1)) : a.$setValidity("extension", !0)
          }
          a.$setViewValue(n.val()), a.$render()
        })
      })
    }
  }
}), app.directive("compareTo", function() {
  return {
    require: "ngModel", scope: {otherModelValue: "=compareTo"}, link: function(t, e, i, n) {
      n.$validators.compareTo = function(e) {
        return e == t.otherModelValue
      }, t.$watch("otherModelValue", function() {
        n.$validate()
      })
    }
  }
}), app.directive("moreThan", function() {
  return {
    require: "ngModel", scope: {otherModelValue: "=moreThan"}, link: function(t, e, i, n) {
      n.$validators.moreThan = function(e) {
        return parseInt(e) >= parseInt(t.otherModelValue)
      }, t.$watch("otherModelValue", function() {
        n.$validate()
      })
    }
  }
}), app.directive("validPlace", function() {
  return {
    require: "ngModel", link: function(e, t, i, n) {
      n.$parsers.push(function(e) {
        if (e && 0 != e.length) {
          var t;
          return t = /\d/.test(e), n.$setValidity("number", t), e
        }
      })
    }
  }
}), app.directive("validNaming", function() {
  return {
    require: "ngModel", link: function(e, i, t, n) {
      n.$parsers.push(function(e) {
        if (e && 0 != e.length) {
          var t;
          return t = "cyrillic" == $(i).data("alpha") ? /[а-яА-ЯёЁґҐєЄіІїЇ]+/.test(e) : /[a-zA-Zа-яА-ЯёЁґҐєЄіІїЇ]+/.test(e), n.$setValidity("naming", t), e
        }
      })
    }
  }
}), $(document).ready(function() {
  var e, t, l = $(window).outerWidth(), n = 380, c = 620;
  1280 <= l ? t = "desk" : 993 <= l && l < 1280 ? t = "laptop" : 768 <= l && l < 993 ? t = "tablet" : l < 768 && (t = "mobile"), $(".overlay").on("click", function() {
    for (var e = [".nav-toggle", ".header-offscreen"], t = 0; t < e.length; t++) $(e[t])[0].classList.remove("active");
    $(this)[0].classList.remove("active")
  }), $(".nav-toggle").on("click", function(e) {
    e.preventDefault(), $(this).hasClass("active") ? (console.log("..")) : (console.log("...")), $(this)[0].classList.toggle("active"), $(".header-offscreen")[0].classList.toggle("active"), $(this).parents(".header").find(".login")[0].classList.toggle("hide"), $(this).parents("body")[0].classList.toggle("static-position"), $(".overlay")[0].classList.toggle("active")
  }), $(".menu__control, .menu__claster").on("click", function(e) {
    e.preventDefault();
    var t = $(this).data("level");
    $(t)[0].classList.add("active"), $(this).parents(".menu")[0].classList.add("active")
  }), $(".menu__return").on("click", function(e) {
    e.preventDefault(), $(this).parent()[0].classList.remove("active"), $(this).parents(".menu")[0].classList.remove("active")
  }), $(".lang__item").on("click", function(e) {
    e.preventDefault();
    var t = $(this), i = $(".lang__toggle");
    selected_lang = t.data("lang"), current_lang = i.data("current"), selected_lang != current_lang && (i.data("current", selected_lang)[0].classList.toggle("change"), t.siblings(".lang__item").each(function() {
      $(this)[0].classList.remove("active")
    }), t[0].classList.add("active"))
  }), $(".lang__toggle").on("click", function() {
    var t = ".lang__item", i = $(this);

    function e(e) {
      i.data("current", e), i.siblings(t).each(function() {
        $(this)[0].classList.remove("active")
      }), $('[data-lang="' + e + '"]')[0].classList.add("active")
    }

    e("ru" == i.data("current") ? "urk" : "ru"), i[0].classList.toggle("change")
  }), $(".contact-info__control").on("click", function(e) {
    e.preventDefault(), $(this)[0].classList.toggle("active"), $(this).siblings(".contact-info__helper")[0].classList.toggle("active")
  }), $(".link--call").on("click", function(e) {
    $(".contact-info__control").hasClass("active") && $(".contact-info__control").trigger("click")
  }), $(".tooltip-trigger").on("mouseenter", function() {
    $(this).find(".tooltip")[0].classList.add("active")
  }).on("mouseleave", function() {
    $(this).find(".tooltip")[0].classList.remove("active")
  }), $(".tooltip-trigger").on("click", function(e) {
    e.preventDefault(), e.stopImmediatePropagation()
  }), $(".form").on("submit", function(e) {
    e.preventDefault();
    var t = $(this);
    if (hasClass(this, "ng-valid")) if (hasClass(this, "captcha-validate")) hasClass(this, "form--modal") ? (widgetId2 = grecaptcha.render("recaptcha-alt", {
      sitekey: "6LeiKDAUAAAAAKeKeYASbw3AwSbe2QH7l3pqYRMt",
      callback: onSubmitAlt,
      size: "invisible"
    }), grecaptcha.execute(widgetId2)) : (widgetId1 = grecaptcha.render("recaptcha", {
      sitekey: "6LeiKDAUAAAAAKeKeYASbw3AwSbe2QH7l3pqYRMt",
      callback: onSubmit,
      size: "invisible"
    }), grecaptcha.execute(widgetId1)); else {
      hasClass(this, "form--modal") && $(this).parents(".modal-content")[0].classList.add("submit-success"), hasClass(this, "form--tabs") && $(this).parents(".tab-pane")[0].classList.add("submit-success");
      var i = t.serialize();
      $.post(t.attr("action"), i)
    }
    t[0].classList.add("ng-dirty"), t.find(".form__error").each(function() {
      $(this)[0].classList.remove("ng-hide")
    }), t.find(".ng-untouched").each(function() {
      $(this)[0].classList.remove("ng-untouched"), $(this)[0].classList.add("ng-touched")
    }), t.find(".form__input, .checkbox").each(function() {
      $(this)[0].classList.remove("ng-pristine")
    }), t.find('.custom-select-block[class*="required"]').each(function() {
      hasClass(this, "ng-pristine") && this.classList.add("invalided")
    })
  }), $(".submit-control").on("click", function(e) {
    e.preventDefault();
    var t = $(this).data("connect");
    $(t).submit()
  }), $(".btn--addon").on("click", function(e) {
    e.preventDefault()
  }), $(".calc-sidebar").on("click", function(e) {
    e.preventDefault(), $(this).parents(".calculator__info")[0].classList.remove("active"), $("html, body").animate({scrollTop: $($(this).data("target")).offset().top - (l < 480 ? 30 : -40)}, c)
  }), $(".info-close").on("click", function(e) {
    e.preventDefault(), $(this).parents(".calculator__info")[0].classList.remove("active")
  }), $(".link-info-calc").on("mouseenter", function() {
    768 < l && $(this).siblings(".tooltip")[0].classList.add("active")
  }).on("mouseleave", function() {
    768 < l && $(this).siblings(".tooltip")[0].classList.remove("active")
  }), $(".link-info-calc").on("click", function(e) {
    if (l < 768) if (e.preventDefault(), $(this).siblings(".tooltip").hasClass("active")) $(this).siblings(".tooltip")[0].classList.remove("active"); else {
      var t = $(this).siblings(".tooltip");
      t[0].classList.add("active");
      var i = t.offset().top + t.outerHeight(), n = $(window).scrollTop() + $(window).height();
      n < i && $("html, body").animate({scrollTop: $(window).scrollTop() + (i - n)}, c)
    }
  }), $(".edit-form").on("click", function() {
    $(".edit-close").trigger("click")
  }), $(".edit-calc").on("click", function(e) {
    e.preventDefault(), $(".calc-close").trigger("click")
  }), $(".form__input").each(function() {
    0 < $(this).val().length && $(this).parent()[0].classList.add("passed")
  }), $(".form__input").on("focus", function() {
    $(this).parent()[0].classList.add("focused")
  }).on("blur", function() {
    var e = $(this);
    e.parent()[0].classList.remove("focused"), 0 < e.val().length && !hasClass(this, "ng-invalid") ? (e.parent()[0].classList.add("passed"), e.hasClass("input-change") && ("tel" == e.attr("type") ? e.parents(".form")[0].classList.add("phone-changed") : e.parents(".form")[0].classList.add("email-changed"))) : (e.parent()[0].classList.remove("passed"), e.hasClass("input-change") && ("tel" == e.attr("type") ? e.parents(".form")[0].classList.remove("phone-changed") : e.parents(".form")[0].classList.remove("email-changed")))
  }), $(".input-capitalize").on("input", function(e) {
    var t = $(this);
    input_value = t.val();
    for (var i = input_value.split(" "), n = [], a = 0; a < i.length; a++) n[a] = i[a].charAt(0).toUpperCase() + i[a].substr(1);
    t.val(n.join(" "))
  }), $(".input-uppercase").on("input", function(e) {
    var t = $(this);
    t.val(t.val().toUpperCase()), t.trigger("change")
  }), $(".input-separate").on("input", function(e) {
    var t = $(this), i = t.val();
    clean_value = i.split("-").join(""), 8 < clean_value.length && t.val(clean_value.substr(0, 8) + "-" + clean_value.substr(8))
  }), $(".input-latin").on("input", function(e) {
    var t = $(this), i = t.val(), n = i.slice(-1);
    /[а-яА-ЯёЁґҐєЄіІїЇ]/.test(n) && (t.val(i.slice(0, -1)), $(this).trigger("change"))
  }), $(".input-cyrillic").on("input", function(e) {
    var t = $(this), i = t.val(), n = i.slice(-1);
    /[а-яА-ЯёЁґҐєЄіІїЇ]/.test(n) || (t.val(i.slice(0, -1)), $(this).trigger("change"))
  }), $(".limit-words").on("input", function(e) {
    var t = $(this), i = t.val();
    3 < i.split(" ").length && (t.val(i.slice(0, -1)), $(this).trigger("change"))
  }), $(".personal-income").on("input", function(e) {
    var t = $(this).data("sum");
    $(t).change()
  }), $('[ng-model="inputPassword"]').on("input", function(e) {
    var t = $(this), i = $('[ng-model="inputRePassword"]');
    t.val() == i.val() && $('[ng-model="inputRePassword"]').blur()
  }), $(".form__toggle").on("click", function(e) {
    e.preventDefault();
    var t = $(this);
    hasClass(this, "active") ? t.siblings(".form__input").attr("type", "password") : t.siblings(".form__input").attr("type", "text"), t[0].classList.toggle("active")
  }), $(".upload-group").each(function() {
    0 < $(this).find(".upload-preview").length && ($(this).find(".filecheck").val("exist"), $(this).find(".filecheck").trigger("change"))
  }), $(".select-search").jsCustomSelect({
    search: !0,
    searchNoResults: "Нет совпадений",
    searchInputHeight: 58,
    "max-height": 255,
    placeholder: "",
    scroll: {minScrollbarLength: 40}
  }), $(".select-list").jsCustomSelect({
    search: !1,
    placeholder: "",
    scroll: {minScrollbarLength: 40},
    change: function(e) {
      $(e).parents(".select-group").find(".select-list-item").each(function() {
        $(this)[0].classList.remove("selected"), $(this).data("value") == e.value && $(this)[0].classList.add("selected")
      })
    }
  }), $(".select-choose").jsCustomSelect({
    search: !1,
    "max-height": 250,
    placeholder: "",
    scroll: {minScrollbarLength: 40},
    change: function(e) {
      $(e).parents(".card")[0].classList.add("card--change"), $(e).parents(".select-group").find(".select-list-item").each(function() {
        $(this)[0].classList.remove("selected"), $(this).data("value") == e.value && $(this)[0].classList.add("selected")
      })
    }
  }), $(".value-field").on("click", function() {
    var e = $(this).parents(".select"), t = e.find(".custom-select-list");
    if (e.hasClass("open")) {
      var i = t.offset().top + t.outerHeight(), n = $(window).scrollTop() + $(window).height();
      n < i && $("html, body").animate({scrollTop: $(window).scrollTop() + (i - n)}, c)
    }
  }), $(".select-label").on("click", function(e) {
    e.preventDefault(), $(this).siblings(".select").find(".value-field").trigger("click")
  }), $(".card-confirm").on("click", function(e) {
    e.preventDefault(), $(this).parents(".card")[0].classList.remove("card--change")
  }), $("select").on("change", function() {
    $(this).parent()[0].classList.add("selected"), $(this).siblings(".custom-select-block")[0].classList.remove("invalided", "ng-pristine", "ng-untouched", "ng-empty", "ng-invalid")
  }), $("select").on("focus", function() {
    $(this).on("keydown", function(e) {
      35 <= e.keyCode && e.keyCode <= 40 && e.preventDefault()
    })
  }), 0 < $(".licence").length && $(".licence").each(function() {
    var e = $(this).attr("id");
    new jsCustomScroll(document.getElementById(e))
  }), 0 < $("#notification-box").length && new jsCustomScroll(document.getElementById("notification-box")), $(".user__box").on("click", function(e) {
    e.preventDefault(), $("html, body").animate({scrollTop: $(this).offset().top - 100}, c), $(this).parent()[0].classList.toggle("active")
  }), $(".notification").on("click", function(e) {
    e.preventDefault()
  }), $(".notification-more").on("click touchstart", function(e) {
    e.preventDefault(), $(this)[0].classList.toggle("active"), $(this).siblings(".notification-full").slideToggle(n)
  }), $(".repeat-group .link--info").on("click", function(e) {
    e.preventDefault();
    var t = $(this).parent(), i = t.find(".tiny-timer"), n = i.find(".seconds").html();
    n && 0 !== n || (t[0].classList.add("active"), initializeClock(i, addSeconds(59)));
    setTimeout(function() {
      t[0].classList.remove("active")
    }, 6e4)
  }), $(".btn-decline").on("click", function(e) {
    e.preventDefault(), setTimeout(function() {
      $("#modal-decline").modal("show")
    }, 500)
  });
  var i = document.getElementById("slider-money"), a = document.getElementById("input-money");
  if (i) {
    var o = 0 == i.getAttribute("data-min") ? 0 : parseInt(i.getAttribute("data-min")) || 500,
      s = parseInt(i.getAttribute("data-max")) || 3e3;
    u(i, a, {
      start: i.getAttribute("data-value") || 500,
      step: parseInt(i.getAttribute("data-step")) || 50,
      connect: [!0, !1],
      range: {min: o, max: s}
    })
  }
  var r = document.getElementById("slider-time"), d = document.getElementById("input-time");
  if (r) {
    o = 0 == r.getAttribute("data-min") ? 0 : parseInt(r.getAttribute("data-min")) || 1, s = parseInt(r.getAttribute("data-max")) || 20;
    u(r, d, {
      start: r.getAttribute("data-value") || 20,
      step: 1,
      connect: [!0, !1],
      range: {min: 1, max: 20}
    }), r.noUiSlider.on("update", function(e, t) {
      var i = $(".value--time"), n = parseInt(e[t]), a = ["день", "дня", "дней"];
      i[0].classList.remove("dimension--sm"), 1 == n ? i.next().html(a[0]) : 2 == n || 3 == n || 4 == n ? (i.next().html(a[1]), i[0].classList.add("dimension--sm")) : i.next().html(a[2])
    })
  }

  function u(e, n, t) {
    noUiSlider.create(e, t), e.noUiSlider.on("update", function(e, t) {
      var i = parseInt(e[t]);
      n.value = i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }), n.addEventListener("change", function() {
      this.value = this.value.replace(/ /g, ""), e.noUiSlider.set(this.value)
    })
  }

  $(".number-field").on("keydown", function(e) {
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || 65 === e.keyCode && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && e.keyCode <= 40 || (e.shiftKey || e.keyCode < 48 || 57 < e.keyCode) && (e.keyCode < 96 || 105 < e.keyCode) && e.preventDefault()
  }), $(".limit-field").on("keydown", function(e) {
    var t = $(this).attr("ng-maxlength"), i = $(this).val().length;
    var n,
      a = (n = "", void 0 !== window.getSelection ? n = window.getSelection().toString() : void 0 !== document.selection && "Text" == document.selection.type && (n = document.selection.createRange().text), n);
    if (t <= i && a.length < 1) {
      if (-1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || 65 === e.keyCode && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && e.keyCode <= 40) return;
      e.preventDefault()
    }
  }), $(".calculator__info-toggle").on("click", function(e) {
    e.preventDefault();
    var i = $(this).parent();
    i[0].classList.add("active"), l < 768 && setTimeout(function() {
      var e = i.offset().top + i.outerHeight(), t = $(window).scrollTop() + $(window).height();
      t < e && $("html, body").animate({scrollTop: $(window).scrollTop() + (e - t)}, c)
    }, c)
  }), $(".tabs-view a").on("click", function(e) {
    "login" == $(this).data("view") ? $("body")[0].classList.add("clean-view") : $("body")[0].classList.remove("clean-view")
  }), $(".accordion a, .faq-accordion a").on("click", function(e) {
    var t = $(this);
    setTimeout(function() {
      $("html, body").animate({scrollTop: t.offset().top - (l < 480 ? 70 : 0)}, c)
    }, 350)
  }), 0 < $("content--faq").length && activator(obj), $(".calculator-config").on("click", function(e) {
    e.preventDefault();
    var t = $(this).parents(".calculator");
    t[0].classList.add("active"), t.find(".calculator__preivew-header").slideUp(n), t.find(".calculator__top").delay(n).slideDown(c), t.find(".calculator__submit").delay(1e3).slideDown(n)
  }), $(".calculator__submit > .btn").on("click", function(e) {
    e.preventDefault();
    var t = $(this).parents(".calculator");
    t[0].classList.remove("active"), t.find(".calculator__submit").slideUp(n), t.find(".calculator__top").delay(n).slideUp(c), t.find(".calculator__preivew-header").delay(1e3).slideDown(n)
  }), $(".calc-open").on("click", function(e) {
    e.preventDefault();
    var t = $(this), i = t.parents(".toogle-section");
    t[0].classList.add("insivible"), i.find(".credit")[0].classList.add("credit--open"), i.find(".calculator").slideDown(c), i.find(".change-controls").delay(c).slideDown(n), $(".next-block").slideUp(n)
  }), $(".calc-close").on("click", function(e) {
    e.preventDefault();
    var t = $(this).parents(".toogle-section");
    t.find(".calc-open")[0].classList.remove("insivible"), t.find(".credit")[0].classList.remove("credit--open"), t.find(".change-controls").slideUp(n), t.find(".calculator").delay(n).slideUp(c), $("html, body").animate({scrollTop: t.offset().top - (l < 480 ? 70 : 0)}, c), $(".next-block").slideDown(n)
  }), $(".edit-open").on("click", function(e) {
    e.preventDefault();
    var t = $(this), i = t.parents(".toogle-section");
    t[0].classList.add("insivible"), i.find(".toggle-first").slideUp(c), i.find(".toggle-second").delay(c).slideDown(c), $(".next-block").slideUp(n)
  }), $(".edit-close").on("click", function(e) {
    e.preventDefault();
    var t = $(this).parents(".toogle-section");
    t.find(".edit-open")[0].classList.remove("insivible"), t.find(".toggle-second").slideUp(c), t.find(".toggle-first").delay(c).slideDown(c), $("html, body").animate({scrollTop: t.offset().top - (l < 480 ? 70 : 0)}, c), $(".next-block").slideDown(n)
  }), $(".toggle-next").on("click", function(e) {
    e.preventDefault();
    var t = $(this), i = t.data("current"), n = t.data("target");
    parent = t.parents(".toogle-section"), parent.find(i).slideUp(c), parent.find(n).delay(c).slideDown(c)
  }), $(".config-top-hide").on("click", function(e) {
    $(".config-top").slideUp(c)
  }), $(".config-top-show").on("click", function(e) {
    $(".config-top").slideDown(c)
  }), $(".pass-change").on("click", function(e) {
    e.preventDefault(), $(this)[0].classList.add("insivible"), $(".password-form").slideDown(c)
  }), $(".pass-back").on("click", function(e) {
    e.preventDefault(), $(".pass-change")[0].classList.remove("insivible"), $(".password-form").slideUp(c)
  }), $("#passport_id").change(function() {
    $(this).is(":checked") ? ($(".passport-regular").slideUp(c), $(".passport-id").delay(c).slideDown(c)) : ($(".passport-id").slideUp(c), $(".passport-regular").delay(c).slideDown(c))
  }), $(".detail__control").on("click", function(e) {
    e.preventDefault();
    var t = $(this);
    current_state = t.html(), open_state = t.data("open"), close_state = t.data("close"), current_state == open_state ? (t.html(close_state), t[0].classList.remove("active"), t.siblings(".detail--more").slideUp(n)) : (t.html(open_state), t[0].classList.add("active"), t.siblings(".detail--more").slideDown(n))
  }), $(".promo-code__toggle").on("click", function(e) {
    e.preventDefault();
    var t = $(this);
    t.parents(".promo-code").hasClass("promo-code--single") && t.parents(".promo-code").siblings(".btn-group")[0].classList.add("group--shrink"), t.slideToggle(n), t.siblings(".promo-code__form").delay(n).slideToggle(n)
  }), $(".promo-code__close").on("click", function(e) {
    e.preventDefault();
    var t = $(this);
    t.parents(".promo-code").hasClass("promo-code--single") && setTimeout(function() {
      t.parents(".promo-code").siblings(".btn-group")[0].classList.remove("group--shrink")
    }, n), t.parents(".promo-code__form").slideToggle(n), t.parents(".promo-code").find(".promo-code__toggle").delay(n).slideToggle(n)
  }), $(".sequence-toggle").on("click", function(e) {
    e.preventDefault(), $(this)[0].classList.toggle("active"), $(this).next().slideToggle(c)
  }), $(".document-toggle").on("click", function(e) {
    e.preventDefault();
    var t = $(this), i = t.find(".toggle-text"), n = i.html(), a = t.data("open"), o = t.data("close"),
      s = t.parents(".document");
    n == a ? (i.html(o), s[0].classList.add("active"), s.find(".document__preview").slideDown(c), setTimeout(function() {
      $("html, body").animate({scrollTop: s.offset().top - (l < 480 ? 70 : 0)}, c)
    }, c)) : (i.html(a), s[0].classList.remove("active"), s.find(".document__preview").slideUp(c))
  }), $(".sidebar").theiaStickySidebar({
    containerSelector: ".main-content",
    additionalMarginTop: 20,
    additionalMarginBottom: 20
  }), $(".login-target").on("click", function(e) {
    e.preventDefault(), $(this)[0].classList.toggle("active"), $(this).siblings(".login").slideToggle(c)
  }), $(".nav-sidebar-target").on("click", function(e) {
    e.preventDefault(), $(this)[0].classList.toggle("active"), $(this).siblings(".nav-sidebar").slideToggle(c)
  }), $(".faq-sidebar .nav-sidebar__item").on("click", function(e) {
    e.preventDefault();
    var t = $(this), i = t.parents(".faq-sidebar");
    l < 993 ? ($(".nav-sidebar-target").trigger("click"), setTimeout(function() {
      $("html, body").animate({scrollTop: $(t.data("faq")).offset().top - (l < 480 ? 130 : 60)}, c)
    }, c)) : $("html, body").animate({scrollTop: $(t.data("faq")).offset().top - 60}, c), i.find(".nav-sidebar__item").each(function() {
      $(this)[0].classList.remove("active")
    }), t[0].classList.add("active")
  }), $(".link-fake").on("click", function(e) {
    e.preventDefault();
    var t = $(this).data("target");
    window.open(t, "_blank")
  }), $(".link-more").on("click", function(e) {
    e.preventDefault();
    var t = $(this);
    current_state = t.html(), open_state = t.data("open"), close_state = t.data("close"), current_state == open_state ? (t.html(close_state), t[0].classList.add("active"), t.siblings(".seo-full").slideDown(n)) : (t.html(open_state), t[0].classList.remove("active"), t.siblings(".seo-full").slideUp(n), $("html, body").animate({scrollTop: t.parent().offset().top - 120}, c))
  });
  new Swiper(".pricing-group", {
    slidesPerView: 3,
    pagination: ".pagination-pricing",
    paginationClickable: !0,
    simulateTouch: !1,
    breakpoints: {560: {slidesPerView: 1}, 768: {slidesPerView: 2}, 993: {slidesPerView: 3}, 1279: {slidesPerView: 2}}
  }), new Swiper(".pricing-row", {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: ".pagination-pricing",
    paginationClickable: !0,
    loop: !0,
    breakpoints: {560: {slidesPerView: 1}, 768: {slidesPerView: 2}, 993: {slidesPerView: 3}}
  });
  var p = new Swiper(".feature-slider", {
    slidesPerView: 1, autoplay: 5e3, loop: !0, onSlideChangeStart: function() {
      p && ($(".tab-pagination .tab__item").each(function() {
        $(this)[0].classList.remove("active")
      }), $('[data-reference="' + (p.realIndex + 1) + '"]').parent()[0].classList.add("active"))
    }
  });
  $(".tab-pagination .tab__link").on("click", function(e) {
    e.preventDefault();
    var t = $(this).data("reference");
    p.slideTo(t), $(".tab-pagination .tab__item").each(function() {
      $(this)[0].classList.remove("active")
    }), $(this).parent()[0].classList.add("active")
  });
  new Swiper(".mobile-feature", {
    slidesPerView: 2,
    pagination: ".pagination-feature",
    paginationClickable: !0,
    loop: !0,
    breakpoints: {560: {slidesPerView: 1}}
  });
  $(document).on("click", function(e) {
    0 < $(e.target).parents(".select-search").length && $(e.target).parents(".select-search").find(".search-input").focus();
    0 < !$(e.target).parents(".info-calc-holder").length && 0 < $(".tooltip-single").length && $(".tooltip-single")[0].classList.remove("active"), 0 < !$(e.target).parents(".user__contols").length && 0 < $(".user__contols").length && $(".user__contols")[0].classList.remove("active"), 0 < !$(e.target).parents(".contact-info--line").length && $(".contact-info__control").hasClass("active") && $(".contact-info__control").trigger("click"), 0 < !$(e.target).parents(".login").length && $(".login").hasClass("active") && $(".login")[0].classList.remove("active")
  }), $(".tooltip-trigger").on("touchstart", function(e) {
    if ($(this).find(".tooltip").hasClass("active")) $(this).find(".tooltip")[0].classList.remove("active"); else {
      var t = $(this).find(".tooltip");
      t[0].classList.add("active");
      var i = t.offset().top + t.outerHeight(), n = $(window).scrollTop() + $(window).height(), a = t.offset().top,
        o = $(window).scrollTop();
      n < i && $("html, body").animate({scrollTop: $(window).scrollTop() + (i - n)}, c), a < o && $("html, body").animate({scrollTop: $(window).scrollTop() - t.outerHeight()}, c)
    }
  }), $(".login__toggle").on("click", function(e) {
    e.preventDefault();
    $(this);
    l < 993 && $(this).parent()[0].classList.toggle("active")
  }), $(document).on("touchstart", function(e) {
    0 < !$(e.target).parents(".tooltip-trigger").length && 0 < $(".tooltip").length && $(".tooltip").each(function() {
      $(this)[0].classList.remove("active")
    }), 0 < !$(e.target).parents(".user__contols").length && 0 < $(".user__contols").length && $(".user__contols")[0].classList.remove("active"), 0 < !$(e.target).parents(".contact-info--line").length && $(".contact-info__control").hasClass("active") && $(".contact-info__control").trigger("click"), 0 < !$(e.target).parents(".login").length && $(".login").hasClass("active") && $(".login")[0].classList.remove("active")
  }), $(document).on("keypress", function(e) {
    13 === e.keyCode && 0 < $(".next-step").length && ("submit" == $(".next-step").attr("type") ? $(".next-step").trigger("click") : window.location.replace($(".next-step").attr("href")))
  }), $(document).on("keydown", function(e) {
    9 === e.keyCode && setTimeout(function() {
      var e = $(":focus").siblings(".custom-select-block");
      $(".custom-select-block.open").find(".value-field").trigger("click"), 0 < e.length && e.find(".value-field").trigger("click")
    }, 120)
  }), l < 993 && ($(".lang").appendTo(".lang-mobile"), $(".fast-calc").appendTo(".mobile-calc"), $(".seo-transition__content").prependTo(".seo-full")), $(".modal-resp").on("click", function(e) {
    l < 768 && e.stopImmediatePropagation()
  }), $(".detail__control").on("click", function(e) {
    if (l < 768) {
      var t = $(this);
      setTimeout(function() {
        $("html, body").animate({scrollTop: t.parent().offset().top - (l < 480 ? 70 : 0)}, c)
      }, c)
    }
  }), $(".pass-change").on("click", function(e) {
    if (l < 768) {
      var t = $(this);
      setTimeout(function() {
        $("html, body").animate({scrollTop: t.siblings(".password-form").offset().top - (l < 480 ? 50 : -20)}, c)
      }, c)
    }
  }), $(".calculator-config, .calculator__submit .btn").on("click", function(e) {
    if (l < 993) {
      var t = $(this);
      setTimeout(function() {
        $("html, body").animate({scrollTop: t.parents(".calculator").offset().top - 66}, c)
      }, 1e3)
    }
  }), $(".number-field").on("touchstart", function() {
    var e = $(this).val().replace(/ /g, "");
    $(this).val(e), $(this).attr("type", "number")
  }), $(".number-field + .form__label").on("touchstart", function() {
    $(this).siblings(".number-field").attr("type", "number")
  }), $(".number-field").on("keydown blur", function() {
    $(this).attr("type", "text")
  });
  var f;
  $(window).scroll(function(e) {
    f && clearTimeout(f);
    var t = $(this).scrollTop();
    f = setTimeout(function() {
      200 < t ? $(".top-scroll").fadeIn(500) : $(".top-scroll").fadeOut(500), t
    }, 30)
  }), $(window).on("resize", function() {
    return 1280 <= (l = $(window).outerWidth()) ? e = "desk" : 993 <= l && l < 1280 ? e = "laptop" : 768 <= l && l < 993 ? e = "tablet" : l < 768 && (e = "mobile"), t != e && ("tablet" == e ? ($(".lang").appendTo(".lang-mobile"), $(".fast-calc").appendTo(".mobile-calc"), $(".seo-transition__content").prependTo(".seo-full")) : "laptop" == e && ($(".lang").appendTo(".lang-desktop"), $(".fast-calc").appendTo(".desktop-calc"), $(".nav-toggle").hasClass("active") && $(".nav-toggle").trigger("click"), $(".seo-transition__content").prependTo(".seo-transition"))), t != e && "mobile" == e && (0 < $(".tab-pane-load").length && l < 768 && $(".tab-pane-load").each(function() {
      $(this)[0].classList.remove("tab-pane-load")
    }), 0 < $(".collapse-load").length && l < 768 && $(".collapse-load").each(function() {
      $(this)[0].classList.remove("collapse-load")
    })), t = e
  }), $(".timer").each(function() {
    var e = $(this);
    initializeClock(e, e.hasClass("timer--short") ? addMinutes(5) : addMinutes(15))
  }), $(window).on("load", function() {
    if (0 < $("#document-page").length) {
      var e = window.location.href.split("#");
      $("#" + e[1]).find(".document-toggle").trigger("click")
    }
    if (0 < $(".tab-pane-load").length && l < 768 && $(".tab-pane-load").each(function() {
      $(this)[0].classList.remove("tab-pane-load")
    }), 0 < $(".collapse-load").length && l < 768 && $(".collapse-load").each(function() {
      $(this)[0].classList.remove("collapse-load")
    }), 0 < $(".sidebar").length && 0 < $(".box").length) {
      var t = $(".sidebar").height();
      $(".box").height() < t && $(".box").css("min-height", t)
    }
    $(".select .search-input").on("input", function(e) {
      var t = $(this);
      input_value = t.val();
      for (var i = input_value.split(" "), n = [], a = 0; a < i.length; a++) n[a] = i[a].charAt(0).toUpperCase() + i[a].substr(1);
      t.val(n.join(" "))
    })
  })
});
var obj = [{$item: $("#question-all"), $menuItem: $("a[data-faq='#question-all']")}, {
  $item: $("#question-general"),
  $menuItem: $("a[data-faq='#question-general']")
}, {$item: $("#question-get"), $menuItem: $("a[data-faq='#question-get']")}, {
  $item: $("#question-pay"),
  $menuItem: $("a[data-faq='#question-pay']")
}, {$item: $("#question-exist"), $menuItem: $("a[data-faq='#question-exist']")}, {
  $item: $("#question-decline"),
  $menuItem: $("a[data-faq='#question-decline']")
}, {$item: $("#question-delay"), $menuItem: $("a[data-faq='#question-delay']")}, {
  $item: $("#question-lk"),
  $menuItem: $("a[data-faq='#question-lk']")
}, {$item: $("#question-bank"), $menuItem: $("a[data-faq='#question-bank']")}];

function activator(i) {
  var t, n = -1;
  $(window).scroll(function(e) {
    t && clearTimeout(t), t = setTimeout(function() {
      for (var e = $(this).scrollTop(), t = 0; t < i.length; t++) {
        i[t].$item.offset().top - 100 < e && (n = t)
      }
      if (-1 != n) {
        for (t = 0; t < i.length; t++) i[t].$menuItem.removeClass("active");
        i[n].$menuItem.addClass("active")
      }
    }, 20)
  })
}

function hasClass(e, t) {
  return -1 < (" " + e.className + " ").indexOf(" " + t + " ")
}

function addMinutes(e) {
  return new Date(Date.now() + 6e4 * e)
}

function addSeconds(e) {
  return new Date(Date.now() + 1e3 * e)
}

Math.easeOutQuad = function(e, t, i, n) {
  return -i * (e /= n) * (e - 2) + t
};
var interval, mult = 0, dir = 0, steps = 70, length = 40;

function MouseWheelHandler(e) {
  e.preventDefault(), clearInterval(interval), ++mult;
  var t = -Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
  dir != t && (mult = 1, dir = t);
  for (var i = e.target; i != document.documentElement; i = i.parentNode) {
    var n = i.scrollTop;
    if (i.scrollTop += t, n != i.scrollTop) break
  }
  var a = i.scrollTop, o = a + length * mult * t - a, s = 0;
  interval = setInterval(function() {
    var e = Math.easeOutQuad(s++, a, o, steps);
    i.scrollTop = e, steps <= s && (mult = 0, clearInterval(interval))
  }, 10)
}

// window.addEventListener("mousewheel", MouseWheelHandler, !1), window.addEventListener("DOMMouseScroll", MouseWheelHandler, !1);
