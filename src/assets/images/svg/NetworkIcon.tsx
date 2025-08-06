import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path stroke="#30323A" strokeLinecap="round" strokeWidth={1.5} d="M12 11v9" />
    <path stroke="#30323A" strokeWidth={1.5} d="M14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    <path
      stroke="#30323A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.959 6C17.619 6.87 18 7.898 18 9s-.381 2.13-1.041 3M7.04 6C6.381 6.87 6 7.898 6 9s.381 2.13 1.041 3M20.316 4C21.38 5.43 22 7.15 22 9s-.62 3.57-1.684 5M3.684 4C2.62 5.43 2 7.15 2 9s.62 3.57 1.684 5"
    />
  </svg>
)
export default SvgComponent
