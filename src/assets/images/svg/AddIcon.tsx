import { SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M8 3.333v9.335M12.668 8.001H3.333" />
  </svg>
)

export default SvgComponent
