/*
 * Copyright (C) 2023-2024 brittni and the polar bear LLC.
 *
 * This file is a part of brittni and the polar bear's Generative Art Project Template,
 * which is released under the GNU Affero General Public License, Version 3.0.
 * You may not use this file except in compliance with the license.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. See LICENSE or go to
 * https://www.gnu.org/licenses/agpl-3.0.en.html for full license details.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 */

import P5Lib from 'p5';

import {
    ALL_PALETTES,
    Color,
    ColorSelector,
    ColorSelectorManager,
    Palette,
    PaletteColorSelector, Random,
    SketchContext
} from '@batpb/genart';

import '../assets/styles/sketch.css';

import { CanvasContext } from './canvas-context';

function sketch(p5: P5Lib): void {
    let selector: ColorSelector;
    const count: number = 1;
    const xs: number[] = [];
    const ys: number[] = [];
    const ds: number[] = [];
    const colors: Color[] = [];
    const outlines: Color[] = [];
    let isShowing: boolean = false;
    let max: number;
    let background: Color;

    const buildColorSelectorManager = (): ColorSelectorManager => {
        const manager: ColorSelectorManager = new ColorSelectorManager();
        const palettes: Palette[] = Array.from(ALL_PALETTES.values);
        const selectors: PaletteColorSelector[] = palettes.map((palette: Palette): PaletteColorSelector =>
            new PaletteColorSelector(palette)
        );
        manager.addColorSelectors(selectors);
        return manager;
    };

    p5.setup = (): void => {
        SketchContext.initialize(p5);
        CanvasContext.buildCanvas(1152, 1536);
        // 2K - 3:4 Ratio - 1152, 1536
        // 2K - 1:1 Ratio - 2048, 2048

        const manager: ColorSelectorManager = buildColorSelectorManager();
        selector = manager.getRandomColorSelector();
        max = Math.max(p5.width, p5.height);
        // TODO - color selectors should return a COPY of the color. Not the color object.
        // TODO - Color copy method
        // TODO - Color constructor that accepts a Color object
        // TODO - Fix p5 context retrieval in all classes that use it. You have to get it inside each method so it stays up to date
        background = selector.getBackgroundColor(0.3, 0.5, 0.2);

        for (let i: number = 0; i < count; i++) {
            const d: number = Random.randomFloat(10, max * 0.2);
            const r: number = d / 2.0;
            const color: Color = new Color(selector.getColor().color);
            color.alpha = Math.floor(185);
            const outline: Color = new Color(selector.getColor().color);
            outline.alpha = 200;
            xs.push(Random.randomFloat(CanvasContext.minWidth + r, CanvasContext.maxWidth - r));
            ys.push(Random.randomFloat(CanvasContext.minHeight + r, CanvasContext.maxHeight - r));
            ds.push(d);
            colors.push(color);
            outlines.push(outline);
        }
    };

    p5.draw = (): void => {
        if (!isShowing) {
            p5.background(background.color);
            p5.strokeWeight((max * 0.001) * 5);

            for (let i: number = 0; i < count; i++) {
                p5.stroke(outlines[i].color);
                p5.fill(colors[i].color);
                p5.ellipse(xs[i], ys[i], ds[i], ds[i]);
            }

            isShowing = true;
        }
    };
}

new P5Lib(sketch);
