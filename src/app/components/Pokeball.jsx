import { sum } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import React from 'react';

class Pokeball extends React.Component {

  render() {
    const r = this.props.radius || 100;
    const strokeWidth = 3.5;
    const innerRadius = r * 0.28;
    const littleRadius = r * 0.143;
    const bandThickness = r * 0.3;

    const colors = this.props.palette.slice(0,5).reverse();
    const totalWeight = sum(colors, c=>c.weight);
    const scale = scaleLinear()
      .domain([0, totalWeight])
      .range([0, r*2]);
    const shades = [];
    colors.reduce((prev, c)=>{
      const width = scale(c.weight);
      shades.push({
        x: prev,
        color: c.color,
        width
      });
      return prev + width;
    }, 0);

    return (
      <svg className="pokeball" width={r*2} height={r*2}>
        <defs>
          <clipPath id="top-half">
            <path
              d={`M 0,${r} A ${r},${r} 0, 0 1 ${r*2} ${r}`}
              fill="blue"
            />
          </clipPath>
        </defs>
        <circle
          cx={r}
          cy={r}
          r={r}
          fill="#f2f2f2"
        />
        <g clipPath="url(#top-half)">
          <rect
            fill={this.props.palette[0].color}
            width={r*2}
            height={r}
          />
          {
            shades.map((s,i)=>{
              return (
                <rect
                  key={'l'+i}
                  x={s.x/2}
                  fill={s.color}
                  width={s.width/2}
                  height={r}
                />
              );
            })
          }
          {
            shades.reverse().map((s,i)=>{
              return (
                <rect
                  key={'r'+i}
                  x={r*2 - s.x/2 - s.width/2}
                  fill={s.color}
                  width={s.width/2}
                  height={r}
                />
              );
            })
          }
        </g>
        <rect
          x={strokeWidth/2}
          y={r-bandThickness/2}
          width={r*2 - strokeWidth}
          height={bandThickness}
          fill="#222"
        />
        <circle
          cx={r}
          cy={r}
          r={innerRadius}
          fill="#f2f2f2"
        />
        <circle
          cx={r}
          cy={r}
          r={littleRadius}
          fill="#999"
        />
        <circle
          cx={r}
          cy={r}
          r={innerRadius}
          fill="none"
          stroke="#000"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={r}
          cy={r}
          r={r - strokeWidth/2}
          fill="none"
          stroke="#222"
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }
}

export default Pokeball;
