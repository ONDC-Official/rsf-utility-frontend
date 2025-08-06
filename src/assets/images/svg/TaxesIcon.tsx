import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="#30323A"
      strokeWidth={1.5}
      d="M2 8.57c0-1.197.482-1.93 1.48-2.486l4.11-2.287C9.743 2.6 10.82 2 12 2c1.18 0 2.257.6 4.41 1.797l4.11 2.287C21.517 6.64 22 7.373 22 8.57c0 .324 0 .487-.035.62-.186.7-.821.811-1.434.811H3.469c-.613 0-1.247-.11-1.434-.811C2 9.056 2 8.893 2 8.569ZM4 10v8.5M8 10v8.5"
    />
    <path stroke="#30323A" strokeLinecap="round" strokeWidth={1.5} d="M11 18.5H5a3 3 0 0 0-3 3 .5.5 0 0 0 .5.5H11" />
    <path stroke="#30323A" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21.5 14.5-7 7" />
    <path
      stroke="#30323A"
      strokeWidth={1.5}
      d="M15.25 16a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM20.75 21.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
    />
  </svg>
)
export default SvgComponent
