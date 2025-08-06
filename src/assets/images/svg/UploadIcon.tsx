import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10 3.75v8.333m0-8.333c-.583 0-1.674 1.662-2.083 2.083M10 3.75c.584 0 1.674 1.662 2.083 2.083M16.667 13.75c0 2.068-.432 2.5-2.5 2.5H5.833c-2.068 0-2.5-.432-2.5-2.5"
    />
  </svg>
)
export default SvgComponent
