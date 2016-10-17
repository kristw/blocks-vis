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

