import { useRef, useEffect, MutableRefObject } from "react";
import { debounce, throttle } from "../lib/performance";

type useDefaultValuesTypes = {
  condition?: string[];
  startAt?: number;
  selector?: string;
  holdFor?: number;
  throttleDelay?: number;
  scrollOnX?: string;
};

function useDefaultValues({
  condition = [],
  startAt = 0,
  selector = "",
}: useDefaultValuesTypes) {
  const elementRef = useRef<HTMLElement>(null);
  const scrollVal = useRef(startAt);
  const condetionsClasses = condition
    ? condition.map((con, ind) => {
        return `scrollCondition-${ind}` + con;
      })
    : [];
  const scrollContainerRef: MutableRefObject<
    Element | (Window & typeof globalThis) | null
  > = useRef(null);
  useEffect(() => {
    scrollContainerRef.current = selector
      ? document.querySelector(selector)
      : window;
  }, [selector]);
  return {
    elementRef,
    scrollVal,
    condetionsClasses,
    scrollContainerRef,
  };
}

export default function useScrollSensore(
  options: {
    forward?: string[];
    inReverse?: string[];
    onHold?: string[];
    holdFor?: number;
    throttleDelay?: number;
    scrollOnX?: boolean;
    selector?: string;
    condition?: string[];
    startAt?: number;
  },
  ...conditionly: (() => boolean | boolean)[]
) {
  const {
    inReverse = [],
    forward = [],
    onHold = [],
    holdFor = 1000,
    throttleDelay = 100,
    scrollOnX = false,
    selector = "",
  } = { ...options };

  const { elementRef, scrollVal, condetionsClasses, scrollContainerRef } =
    useDefaultValues(options);

  let scrollMode;
  useEffect(() => {
    const element = elementRef.current;
    const scrollHandler = () => {
      if (element == undefined) return;
      element.classList.contains(onHold[0])
        ? element.classList.remove(...onHold)
        : "";

      if (selector != "") {
        scrollMode = document.querySelector(selector).scrollTop;
      } else {
        scrollMode = scrollOnX ? scrollX : scrollY;
      }

      if (scrollVal.current < scrollMode) {
        scrollVal.current = scrollMode;
        element.classList.add(...forward);
        element.classList.remove(...inReverse);
      } else if (scrollVal.current > scrollMode) {
        scrollVal.current = scrollMode;
        element.classList.add(...inReverse);
        element.classList.remove(...forward);
      }
      if (condetionsClasses == null) return;
      conditionly.map((cb, ind) => {
        if (typeof cb == "function") {
          element?.classList.toggle(condetionsClasses[ind], cb());
        } else if (typeof cb == "boolean") {
          element?.classList.toggle(condetionsClasses[ind], cb);
        }
      });
    };
    function scrollStop() {
      if (element == undefined) return;
      if (element.classList.contains(onHold[0]) == false) {
        element.classList.remove(...forward);
        element.classList.remove(...inReverse);
        element.classList.add(...onHold);
      }
    }
    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener(
      "scroll",
      throttle(scrollHandler, throttleDelay)
    );
    onHold
      ? scrollContainer?.addEventListener(
          "scroll",
          debounce(scrollStop, holdFor)
        )
      : "";
    return () => {
      scrollContainer?.removeEventListener(
        "scroll",
        throttle(scrollHandler, throttleDelay)
      );
      onHold
        ? scrollContainer?.removeEventListener(
            "scroll",
            debounce(scrollStop, holdFor)
          )
        : "";
    };
  }, [holdFor, onHold, scrollContainerRef, throttleDelay]);

  return elementRef;
}
