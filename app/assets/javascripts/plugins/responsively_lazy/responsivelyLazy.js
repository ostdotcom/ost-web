/*
 * Responsively Lazy
 * http://ivopetkov.com/b/lazy-load-responsive-images/
 * Copyright 2015-2017, Ivo Petkov
 * Free to use under the MIT license.
 */

var responsivelyLazy = (function () {
    var hasWebPSupport = false;
    var windowWidth = null;
    var windowHeight = null;
    var hasIntersectionObserverSupport = typeof IntersectionObserver !== 'undefined';

    var isVisible = function (element) {
        if (windowWidth === null) {
            return false;
        }
        var rect = element.getBoundingClientRect();
        var elementTop = rect.top;
        var elementLeft = rect.left;
        var elementWidth = rect.width;
        var elementHeight = rect.height;
        return elementTop < windowHeight && elementTop + elementHeight > 0 && elementLeft < windowWidth && elementLeft + elementWidth > 0;
    };

    var updateElement = function (container, element) {
        var options = element.getAttribute('data-srcset');
        if (options !== null) {
            options = options.trim();
            if (options.length > 0) {
                options = options.split(',');
                var temp = [];
                var optionsCount = options.length;
                for (var j = 0; j < optionsCount; j++) {
                    var option = options[j].trim();
                    if (option.length === 0) {
                        continue;
                    }
                    var spaceIndex = option.lastIndexOf(' ');
                    if (spaceIndex === -1) {
                        var optionImage = option;
                        var optionWidth = 999998;
                    } else {
                        var optionImage = option.substr(0, spaceIndex);
                        var optionWidth = parseInt(option.substr(spaceIndex + 1, option.length - spaceIndex - 2), 10);
                    }
                    var add = false;
                    if (optionImage.indexOf('.webp', optionImage.length - 5) !== -1) {
                        if (hasWebPSupport) {
                            add = true;
                        }
                    } else {
                        add = true;
                    }
                    if (add) {
                        temp.push([optionImage, optionWidth]);
                    }
                }
                temp.sort(function (a, b) {
                    if (a[1] < b[1]) {
                        return -1;
                    }
                    if (a[1] > b[1]) {
                        return 1;
                    }
                    if (a[1] === b[1]) {
                        if (b[0].indexOf('.webp', b[0].length - 5) !== -1) {
                            return 1;
                        }
                        if (a[0].indexOf('.webp', a[0].length - 5) !== -1) {
                            return -1;
                        }
                    }
                    return 0;
                });
                options = temp;
            } else {
                options = [];
            }
        } else {
            options = [];
        }
        var containerWidth = container.offsetWidth * window.devicePixelRatio;

        var bestSelectedOption = null;
        var optionsCount = options.length;
        for (var j = 0; j < optionsCount; j++) {
            var optionData = options[j];
            if (optionData[1] >= containerWidth) {
                bestSelectedOption = optionData;
                break;
            }
        }

        if (bestSelectedOption === null) {
            bestSelectedOption = [element.getAttribute('src'), 999999];
        }

        if (typeof container.responsivelyLazyLastSetOption === 'undefined') {
            container.responsivelyLazyLastSetOption = ['', 0];
        }
        if (container.responsivelyLazyLastSetOption[1] < bestSelectedOption[1]) {
            container.responsivelyLazyLastSetOption = bestSelectedOption;
            var url = bestSelectedOption[0];
            if (typeof container.responsivelyLazyEventsAttached === 'undefined') {
                container.responsivelyLazyEventsAttached = true;
                element.addEventListener('load', function () {
                    var handler = container.getAttribute('data-onlazyload');
                    if (handler !== null) {
                        (new Function(handler).bind(container))();
                    }
                }, false);
                element.addEventListener('error', function () {
                    container.responsivelyLazyLastSetOption = ['', 0];
                }, false);
            }
            if (url === element.getAttribute('src')) {
                element.removeAttribute('srcset');
            } else {
                element.setAttribute('srcset', url);
            }
        }
    };

    var updateWindowSize = function () {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    };

    var run = function () {
        var update = function (elements, unknownHeight) {
            var elementsCount = elements.length;
            for (var i = 0; i < elementsCount; i++) {
                var element = elements[i];
                var container = unknownHeight ? element : element.parentNode;
                if (isVisible(container)) {
                    updateElement(container, element);
                }
            }
        };
        update(document.querySelectorAll('.responsively-lazy > img'), false);
        update(document.querySelectorAll('img.responsively-lazy'), true);
    };

    /* Begin: OST Specific Changes */
    var forceLoadAll = function () {
        var update = function (elements, unknownHeight) {
            var elementsCount = elements.length;
            for (var i = 0; i < elementsCount; i++) {
                var element = elements[i];
                var container = unknownHeight ? element : element.parentNode;
                updateElement(container, element);
            }
        };
        update(document.querySelectorAll('.responsively-lazy > img'), false);
        update(document.querySelectorAll('img.responsively-lazy'), true);
    };
    /* End: OST Specific Changes */


    if ('srcset' in document.createElement('img') && typeof window.devicePixelRatio !== 'undefined' && typeof window.addEventListener !== 'undefined' && typeof document.querySelectorAll !== 'undefined') {

        updateWindowSize();

        var image = new Image();
        image.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEADMDOJaQAA3AA/uuuAAA=';
        image.onload = image.onerror = function () {
            hasWebPSupport = image.width === 2;

            var requestAnimationFrameFunction = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };

            var hasChange = true;
            var runIfHasChange = function () {
                if (hasChange) {
                    hasChange = false;
                    run();
                }
                requestAnimationFrameFunction.call(null, runIfHasChange);
            };

            runIfHasChange();

            if (hasIntersectionObserverSupport) {

                var updateIntersectionObservers = function () {
                    var elements = document.querySelectorAll('.responsively-lazy');
                    var elementsCount = elements.length;
                    for (var i = 0; i < elementsCount; i++) {
                        var element = elements[i];
                        if (typeof element.responsivelyLazyObserverAttached === 'undefined') {
                            element.responsivelyLazyObserverAttached = true;
                            intersectionObserver.observe(element);
                        }
                    }
                };

                var intersectionObserver = new IntersectionObserver(function (entries) {
                    for (var i in entries) {
                        var entry = entries[i];
                        if (entry.intersectionRatio > 0) {
                            var target = entry.target;
                            if (target.tagName.toLowerCase() !== 'img') {
                                var img = target.querySelector('img');
                                if (img !== null) {
                                    updateElement(target, img);
                                }
                            } else {
                                updateElement(target, target);
                            }
                        }
                    }
                });

                var changeTimeout = null;

            }

            var setChanged = function () {
                if (hasIntersectionObserverSupport) {
                    window.clearTimeout(changeTimeout);
                    changeTimeout = window.setTimeout(function () {
                        hasChange = true;
                    }, 300);
                } else {
                    hasChange = true;
                }
            };

            var updateParentNodesScrollListeners = function () {
                var elements = document.querySelectorAll('.responsively-lazy');
                var elementsCount = elements.length;
                for (var i = 0; i < elementsCount; i++) {
                    var parentNode = elements[i].parentNode;
                    while (parentNode && parentNode.tagName.toLowerCase() !== 'html') {
                        if (typeof parentNode.responsivelyLazyScrollAttached === 'undefined') {
                            parentNode.responsivelyLazyScrollAttached = true;
                            parentNode.addEventListener('scroll', setChanged);
                        }
                        parentNode = parentNode.parentNode;
                    }
                }
            };

            var initialize = function () {
                window.addEventListener('resize', function () {
                    updateWindowSize();
                    setChanged();
                });
                window.addEventListener('scroll', setChanged);
                window.addEventListener('load', setChanged);
                if (hasIntersectionObserverSupport) {
                    updateIntersectionObservers();
                }
                updateParentNodesScrollListeners();
                if (typeof MutationObserver !== 'undefined') {
                    var observer = new MutationObserver(function () {
                        if (hasIntersectionObserverSupport) {
                            updateIntersectionObservers();
                        }
                        updateParentNodesScrollListeners();
                        setChanged();
                    });
                    observer.observe(document.querySelector('body'), {childList: true, subtree: true});
                }
            };
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initialize);
            } else {
                initialize();
            }
        };
    }

    return {
        'run': run,
        'isVisible': isVisible,
        /* Begin: OST Specific Changes */
        'forceLoadAll': forceLoadAll,
        'updateElement': updateElement
        /* End: OST Specific Changes */
    };

}());
