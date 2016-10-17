import d3 from 'd3';
import React from 'react';

class StripedEgg extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const strokeWidth = 2;
    const rx = (this.props.rx * 2 - 1 - strokeWidth)/2;
    const ry = this.props.ry - 1  - strokeWidth/2;

    const w = rx * 2;
    const h = rx + ry;

    const colors = this.props.palette.slice(0,5);
    const totalWeight = d3.sum(colors, c=>c.weight);
    const scale = d3.scale.linear()
      .domain([0, totalWeight])
      .range([0, h]);
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
      <svg
        className="striped-egg"
        width={this.props.rx * 2}
        height={this.props.rx + this.props.ry}
      >
        <defs>
          <clipPath id="top-half">
        <path
          d={[
            `M ${w},${ry} A ${rx},${rx} 0, 0 1 0,${ry}`,
            `A ${rx},${ry} 0 0 1 ${w},${ry}`
          ].join(' ')}
          fill="none"
          stroke="#ddd"
        />
          </clipPath>
        </defs>

        <g transform={`translate(${strokeWidth}, ${strokeWidth})`}>
          <g clipPath="url(#top-half)">
            {
              shades.map((s,i)=>{
                return (
                  <rect
                    key={'l'+i}
                    y={h - s.x - s.width}
                    fill={s.color}
                    width={w}
                    height={s.width}
                  />
                );
              })
            }
          </g>
          <path
            d={[
              `M ${w},${ry} A ${rx},${rx} 0, 0 1 0,${ry}`,
              `A ${rx},${ry} 0 0 1 ${w},${ry}`
            ].join(' ')}
            fill="none"
            stroke="#ddd"
            strokeWidth={strokeWidth}
          />
        </g>
      </svg>
    );
  }
}

export default StripedEgg;
