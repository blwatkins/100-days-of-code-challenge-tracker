/*
 * Copyright (C) 2024 brittni and the polar bear LLC.
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

import { AspectRatio } from './aspect-ratio';

export class AspectRatioHandler {
    private readonly _width: number;
    private readonly _height: number;

    public constructor(aspectRatio: AspectRatio, baseResolution: number) {
        const unit: number = this.calculateUnit(aspectRatio, baseResolution);
        this._width = Math.floor(unit * aspectRatio.WIDTH_RATIO);
        this._height = Math.floor(unit * aspectRatio.HEIGHT_RATIO);
    }

    private calculateUnit(aspectRatio: AspectRatio, baseResolution: number): number {
        return baseResolution / Math.min(aspectRatio.WIDTH_RATIO, aspectRatio.HEIGHT_RATIO);
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public static buildAspectRatio(widthRatio: number, heightRatio: number, name?: string): AspectRatio {
        let ratioName: string;
        const width: number = Math.floor(widthRatio);
        const height: number = Math.floor(heightRatio);

        if (name) {
            ratioName = name;
        } else {
            ratioName = `${width}:${height}`;
        }

        return {
            NAME: ratioName,
            WIDTH_RATIO: width,
            HEIGHT_RATIO: height
        };
    }
}
