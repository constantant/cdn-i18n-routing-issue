import { Location, LocationStrategy } from '@angular/common';
import { Injectable, ɵɵinject } from '@angular/core';

@Injectable({
  providedIn: 'root',
  // See #23917
  useFactory: createLocation,
})
export class FixedLocation extends Location {
  private readonly baseHref = stripOrigin(stripTrailingSlash(_stripIndexHtml(this.locationStrategy.getBaseHref())));

  constructor(private readonly locationStrategy: LocationStrategy) {
    super(locationStrategy);
  }

  override path(includeHash: boolean = false): string {
    return this.normalize(this.locationStrategy.path(includeHash));
  }

  override normalize(url: string): string {
    return stripTrailingSlash(_stripBaseHref(this.baseHref, _stripIndexHtml(url)));
  }
}

function _stripBaseHref(baseHref: string, url: string): string {
  return baseHref && url.startsWith(baseHref) ? url.substring(baseHref.length) : url;
}

function _stripIndexHtml(url: string): string {
  return url.replace(/\/index.html$/, '');
}

function stripTrailingSlash(url: string): string {
  const match = url.match(/#|\?|$/);
  const pathEndIdx = match && match.index || url.length;
  const droppedSlashIdx = pathEndIdx - (url[pathEndIdx - 1] === '/' ? 1 : 0);
  return url.slice(0, droppedSlashIdx) + url.slice(pathEndIdx);
}

function stripOrigin(baseHref: string): string {
  if (/^(https?:)?\/\//.test(baseHref)) {
    const [, pathname] = baseHref.split(/\/\/[^\/]+/);
    return pathname;
  }
  return baseHref;
}

export function createLocation() {
  return new FixedLocation(ɵɵinject(LocationStrategy as any));
}
