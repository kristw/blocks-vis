import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import Pokeball from './components/Pokeball.jsx';

const formatPercent = d3.format('.1%');

class App extends React.Component {
  render() {
    const { blocks } = this.props;

    return (
      <div>
        {blocks
          .sort((a, b) => b.count - a.count)
          .map(b => (
            <div className="pokeball-container" key={b.ownerId}>
              <div className="owner">
                <a href={`http://bl.ocks.org/${b.login}`}>{b.login}</a>
                &nbsp;
                ({b.count})
              </div>
              <a href={`http://bl.ocks.org/${b.login}`}>
                <Pokeball radius={30} palette={b.colors} />
              </a>
            </div>
          ))
        }
      </div>
    );
  }
}

d3.json('data/processed/colors.json', (error, blocks) => {

  ReactDOM.render(
    <App blocks={blocks}/>,
    document.getElementById('app')
  );

});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create','UA-59971789-1');
ga('send','pageview');
