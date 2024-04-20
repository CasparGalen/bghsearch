import React from "react";
import { useSliderState } from "react-stately";

import {
  mergeProps,
  useFocusRing,
  useNumberFormatter,
  useSlider,
  useSliderThumb,
  VisuallyHidden
} from "react-aria";

import "./AriaSlider.css";

export function AriaSlider(props) {
  let trackRef = React.useRef(null);

  let numberFormatter = useNumberFormatter(props.formatOptions);
  let state = useSliderState({ ...props, numberFormatter });
  let { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef
  );
  let startdate = Intl.DateTimeFormat('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(state.getThumbValue(0) * 1000)
  let enddate = Intl.DateTimeFormat('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(state.getThumbValue(1) * 1000)
  
  return (

    <div {...groupProps} className={`slider ${state.orientation}`}>
      {props.label && (
        <div className="label-container">
          <label {...labelProps}>{props.label}</label>
          <output {...outputProps}>
            {`${startdate} - ${enddate}`} 
          </output>
        </div>
      )}
      <div
        {...trackProps}
        ref={trackRef}
        className={`track ${state.isDisabled ? "disabled" : ""}`}
      >
        <Thumb index={0} state={state} trackRef={trackRef} />
        <Thumb index={1} state={state} trackRef={trackRef} />
      </div>
    </div>

  );
}

function Thumb(props) {
  let { state, trackRef, index } = props;
  let inputRef = React.useRef(null);
  let { thumbProps, inputProps, isDragging } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef
    },
    state
  );

  let { focusProps, isFocusVisible } = useFocusRing();
  return (
    <div
      {...thumbProps}
      className={`thumb ${isFocusVisible ? "focus" : ""} ${
        isDragging ? "dragging" : ""
      }`}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </div>
  );
}
