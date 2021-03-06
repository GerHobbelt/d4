(function() {
  'use strict';
  d4.feature('columnLabels',function(name) {
    var padding = 5;
    var anchorText = function() {
      if (this.y.$scale !== 'ordinal') {
        return 'middle';
      } else {
        return 'start';
      }
    };
    return {
      accessors: {
        x: function(d) {
          if(this.x.$scale === 'ordinal') {
            return this.x(d[this.x.$key]) + (this.x.rangeBand() / 2);
          } else {
            var width = Math.abs(this.x(d[this.x.$key]) - this.x(0));
            return this.x(d[this.x.$key]) - width/2;
          }
        },

        y: function(d) {
          if(this.y.$scale === 'ordinal') {
            return this.y(d[this.y.$key]) + (this.y.rangeBand() / 2) + padding;
          } else {
            var height = Math.abs(this.y(d[this.y.$key]) - this.y(0));
            return (d[this.y.$key] < 0 ? this.y(d[this.y.$key]) - height : this.y(d[this.y.$key])) - padding;
          }
        },

        text: function(d) {
          return d3.format('').call(this, d[this.valueKey]);
        }
      },
      render: function(scope, data, selection) {
        selection.append('g').attr('class', name);
        var label = this.svg.select('.'+name).selectAll('.'+name)
        .data(data, function(d, i){
          return '' + d.key + i;
        });
        label.enter().append('text');
        label.exit().remove();
        label.attr('class', 'column-label')
          .text(d4.functor(scope.accessors.text).bind(this))
          .attr('text-anchor', anchorText.bind(this))
          .attr('x', d4.functor(scope.accessors.x).bind(this))
          .attr('y', d4.functor(scope.accessors.y).bind(this));
        return label;
      }
    };
  });
}).call(this);