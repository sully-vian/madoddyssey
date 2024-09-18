
import * as htmlToImage from 'html-to-image';
import {toSVG} from 'html-to-image';

function  filter (node) {
    return (node.tagName !== 'i');
}

htmlToImage.toSVG(document.body, { filter: filter }).then(function (svg) {
    console.log(svg);
});