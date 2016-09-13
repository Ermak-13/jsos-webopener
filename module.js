(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var Widget = require('./widget'),
    Shortcut = require('./shortcut'),
    locales = require('./locales');

global.I18n.registryDict(locales);
global.OS.installModule('Webopener', {
  Widget: Widget,
  Shortcut: Shortcut
});


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./locales":4,"./shortcut":7,"./widget":8}],2:[function(require,module,exports){
(function (global){
var Dialog = global.OS.Dialog.Default,
    HForm = global.OS.HForm,
    Input = global.OS.Input;

var LinkCreatorDialog = React.createClass({displayName: "LinkCreatorDialog",
  getInitialState: function () {
    return {
      linkText: null
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var link = {
      url: this.refs.linkUrl.getValue(),
      iconUrl: this.refs.iconUrl.getValue(),
      text: this.refs.text.getValue()
    };

    this.close();
    this.props.onSubmit(link);
  },

  handleChangeLinkUrl: function (url) {
    var parsedUrl = OS.parseURL(url);
    if (parsedUrl) {
      var linkText = parsedUrl.hostname;
      this.setState({
        linkText: linkText
      });
    }
  },

  open: function () {
    this.refs.dialog.open();
  },

  close: function () {
    this.refs.dialog.close();
  },

  render: function () {
    return (
      React.createElement(Dialog, {
        ref: "dialog", 
        title:  global.I18n.t('webopener.link_creator.title') }, 

        React.createElement(HForm.Form, {onSubmit:  this.handleSubmit}, 
          React.createElement(HForm.Field, {
            labelText:  global.I18n.t('webopener.link_url.label') }, 
            React.createElement(Input, {
              ref: "linkUrl", 
              onChange:  this.handleChangeLinkUrl}
            )
          ), 

          React.createElement(HForm.Field, {
            labelText:  global.I18n.t('webopener.icon_url.label') }, 
            React.createElement(Input, {
              ref: "iconUrl"}
            )
          ), 

          React.createElement(HForm.Field, {
            labelText:  global.I18n.t('webopener.link_text.label') }, 
            React.createElement(Input, {
              ref: "text", 
              value:  this.state.linkText}
            )
          ), 

          React.createElement(HForm.Submit, {value:  global.I18n.t('webopener.link_creator.submit.value') })
        )
      )
    );
  }
});

module.exports = LinkCreatorDialog;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
var en = {
  'webopener.link_creator.btn': 'add',
  'webopener.link_creator.title': 'Webopener - Link Creator',
  'webopener.link_creator.submit.value': 'Create',
  'webopener.link_url.label': 'link url:',
  'webopener.icon_url.label': 'icon url:',
  'webopener.link_text.label': 'text:',
};

module.exports = en;


},{}],4:[function(require,module,exports){
module.exports = {
  en: require('./en'),
  ru: require('./ru')
};


},{"./en":3,"./ru":5}],5:[function(require,module,exports){
var ru = {
  'webopener.link_creator.btn': 'добавить',
  'webopener.link_creator.title': 'Webopener - создатель ссылок',
  'webopener.link_creator.submit.value': 'Создать',
  'webopener.link_url.label': 'ссылка url:',
  'webopener.icon_url.label': 'иконка url:',
  'webopener.link_text.label': 'текст:',
};

module.exports = ru;


},{}],6:[function(require,module,exports){
(function (global){
var settings = {
  LINK_CREATOR_DIALOG_REF_NAME: 'linkCreatorDialog',

  DEFAULT_SIZE: {
    width: '550px',
    height: '360px'
  },
  DEFAULT_POSITION: global.Settings.get('default_position'),

  DEFAULT_LINK_STYLES: {
    display: 'block',
    width: '120px',
    textAlign: 'center',
    float: 'left',
    padding: '10px',
    margin: '5px'
  },

  DEFAULT_ICON_STYLES: {
    width: '100px',
    fontSize: '100px',
    color: '#333'
  },

  DEFAULT_TEXT_STYLES: {
    color: '#333'
  }
};

module.exports = settings;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
var Link = global.OS.Link;

var Shortcut = React.createClass({displayName: "Shortcut",
  render: function () {
    return (
      React.createElement(Link, {
        className:  this.props.className, 
        onClick:  this.props.onClick}, 

        React.createElement("span", {className: "fa fa-globe"})
      )
    );
  }
});

module.exports = Shortcut;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
var Mixins = global.OS.Mixins,
    Widget = global.OS.Widget,
    Configurator = global.OS.Configurator,
    Link = global.OS.Link,

    settings = require('./settings'),
    LinkCreatorDialog = require('./link_creator_dialog');

var _Widget = React.createClass({displayName: "_Widget",
  mixins: [Mixins.WidgetHelper],

  getDefaultProps: function () {
    return {
      linkCreatorDialogRefName: settings.LINK_CREATOR_DIALOG_REF_NAME
    };
  },

  getInitialState: function () {
    return {
      links: [],

      size: settings.DEFAULT_SIZE,
      position: settings.DEFAULT_POSITION,
      linkStyles: settings.DEFAULT_LINK_STYLES,
      iconStyles: settings.DEFAULT_ICON_STYLES,
      textStyles: settings.DEFAULT_TEXT_STYLES
    };
  },

  openLinkCreator: function () {
    var ref = this.refs[
      this.props.linkCreatorDialogRefName
    ];

    ref.open();
  },

  createLink: function (link) {
    var links = this.state.links;
    links.push(link);

    this.setData({
      links: links
    }, this.saveData);
  },

  _getData: function () {
    return {
      links: _.clone(this.state.links)
    };
  },

  _getSettings: function () {
    return {
      size: _.clone(this.state.size),
      position: _.clone(this.state.position)
    };
  },

  componentWillMount: function () {
    this.init();
  },

  render: function () {
    return (
      React.createElement(Widget.Widget, {widgetStyles:  this.getWidgetStyles() }, 
        React.createElement(Widget.DefaultHeader, {
          title:  s.capitalize(this.getName()), 
          onMouseDownPositionBtn:  this.handleStartMoving, 
          onClickCloseBtn:  this.close, 
          onClickConfigureBtn:  this.openConfigurator}
        ), 

        React.createElement(Widget.Body, null, 
           this.getLinksHTML(), 

           this.getLinkCreatorBtnHTML() 
        ), 

        React.createElement(LinkCreatorDialog, {
          ref:  this.props.linkCreatorDialogRefName, 
          onSubmit:  this.createLink}
        )
      )
    );
  },

  getLinksHTML: function () {
    var linksHTML = _.map(this.state.links, function (link, i) {
      return (
        React.createElement(Link, {
          key:  i, 
          href:  link.url, 
          style:  this.state.linkStyles}, 

          React.createElement("img", {
            style:  this.state.iconStyles, 
            src:  link.iconUrl}
          ), 

          React.createElement("span", {style:  this.state.textStyles}, 
             link.text
          )
        )
      );

    }.bind(this));

    return linksHTML;
  },

  getLinkCreatorBtnHTML: function () {
    return (
      React.createElement(Link, {
        style:  this.state.linkStyles, 
        onClick:  this.openLinkCreator}, 

        React.createElement("span", {
          style:  this.state.iconStyles, 
          className: "fa fa-plus-square-o"}), 

        React.createElement("span", {style:  this.state.textStyles}, 
           global.I18n.t('webopener.link_creator.btn') 
        )
      )
    );
  }
});

module.exports = _Widget;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./link_creator_dialog":2,"./settings":6}]},{},[1])