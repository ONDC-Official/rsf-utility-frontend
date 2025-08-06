import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M17.5 5.833V10m-15-4.167v8.468c0 1.152 1.621 1.837 4.864 3.207 1.303.55 1.954.825 2.636.825V9.462M12.5 15.833s.73 0 1.458 1.667c0 0 2.316-4.167 4.375-5"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M6.938 8.076 4.504 6.9C3.168 6.252 2.5 5.929 2.5 5.417s.668-.835 2.004-1.482l2.434-1.177C8.441 2.03 9.192 1.667 10 1.667c.808 0 1.56.363 3.062 1.09l2.434 1.178c1.336.647 2.004.97 2.004 1.482s-.668.835-2.004 1.482l-2.434 1.177c-1.503.727-2.254 1.091-3.062 1.091-.808 0-1.56-.364-3.062-1.09ZM5 10l1.667.833M14.167 3.333 5.833 7.5"
    />
  </svg>
)
export default SvgComponent
