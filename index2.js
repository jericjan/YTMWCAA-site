"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CircularStatic;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function CircularProgressWithLabel(props) {
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    position: "relative",
    display: "inline-flex"
  }, /*#__PURE__*/_react.default.createElement(_CircularProgress.default, _extends({
    variant: "determinate"
  }, props)), /*#__PURE__*/_react.default.createElement(_Box.default, {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "caption",
    component: "div",
    color: "textSecondary"
  }, `${Math.round(props.value)}%`)));
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: _propTypes.default.number.isRequired
};

function CircularStatic() {
  const [progress, setProgress] = _react.default.useState(10);

  _react.default.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => prevProgress >= 100 ? 0 : prevProgress + 10);
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return /*#__PURE__*/_react.default.createElement(CircularProgressWithLabel, {
    value: progress
  });
}