import { SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      stroke="#fff"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M6.667 18.333v-2.5c0-1.571 0-2.357.488-2.845S8.429 12.5 10 12.5c1.571 0 2.357 0 2.845.488s.488 1.274.488 2.845v2.5"
    />
    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M8.333 5.833h3.334" />
    <path
      stroke="#fff"
      strokeWidth={1.25}
      d="M2.5 9.882c0-3.814 0-5.72 1.156-6.929a4.16 4.16 0 0 1 .13-.13c1.209-1.156 3.116-1.156 6.93-1.156.903 0 1.339.003 1.753.157.4.15.733.428 1.402.985l1.83 1.525c.885.737 1.327 1.106 1.563 1.61s.236 1.08.236 2.231v2.658c0 3.125 0 4.687-.796 5.783a4.166 4.166 0 0 1-.922.921c-1.095.796-2.657.796-5.782.796s-4.687 0-5.782-.796a4.167 4.167 0 0 1-.922-.921C2.5 15.52 2.5 13.958 2.5 10.833v-.951Z"
    />
  </svg>
)
export default SvgComponent
