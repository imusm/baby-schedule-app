import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Polyline, Circle, Line, Text as SvgText} from 'react-native-svg';
import {format, parseISO} from 'date-fns';

import {colors, spacing, typography} from '../theme';
import {WeightEntry} from '../types';

interface WeightChartProps {
  data: WeightEntry[]; // any order
}

const HEIGHT = 180;
const PAD = 28;

export const WeightChart: React.FC<WeightChartProps> = ({data}) => {
  const [width, setWidth] = useState(0);

  const points = [...data]
    .filter((d) => typeof d.weightKg === 'number')
    .sort((a, b) => a.date.localeCompare(b.date));

  if (points.length < 2) {
    return (
      <View style={styles.empty}>
        <Text style={typography.bodyMuted}>
          Add at least two weigh-ins to see the growth trend.
        </Text>
      </View>
    );
  }

  const weights = points.map((p) => p.weightKg);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const range = max - min || 1;

  const innerW = Math.max(0, width - PAD * 2);
  const innerH = HEIGHT - PAD * 2;

  const x = (i: number) =>
    PAD + (points.length === 1 ? 0 : (i / (points.length - 1)) * innerW);
  const y = (w: number) => PAD + innerH - ((w - min) / range) * innerH;

  const polyline = points.map((p, i) => `${x(i)},${y(p.weightKg)}`).join(' ');

  return (
    <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      {width > 0 && (
        <Svg width={width} height={HEIGHT}>
          {/* baseline + top gridline */}
          <Line x1={PAD} y1={PAD} x2={width - PAD} y2={PAD} stroke={colors.border} strokeWidth={1} />
          <Line
            x1={PAD}
            y1={HEIGHT - PAD}
            x2={width - PAD}
            y2={HEIGHT - PAD}
            stroke={colors.border}
            strokeWidth={1}
          />
          {/* min / max labels */}
          <SvgText x={4} y={PAD + 4} fontSize="10" fill={colors.textMuted}>
            {max.toFixed(1)}
          </SvgText>
          <SvgText x={4} y={HEIGHT - PAD + 4} fontSize="10" fill={colors.textMuted}>
            {min.toFixed(1)}
          </SvgText>
          {/* trend line */}
          <Polyline
            points={polyline}
            fill="none"
            stroke={colors.weight}
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* points */}
          {points.map((p, i) => (
            <Circle key={p.id} cx={x(i)} cy={y(p.weightKg)} r={4} fill={colors.weight} />
          ))}
          {/* first / last date */}
          <SvgText x={PAD} y={HEIGHT - 6} fontSize="10" fill={colors.textMuted}>
            {format(parseISO(points[0].date), 'd MMM')}
          </SvgText>
          <SvgText
            x={width - PAD}
            y={HEIGHT - 6}
            fontSize="10"
            fill={colors.textMuted}
            textAnchor="end">
            {format(parseISO(points[points.length - 1].date), 'd MMM')}
          </SvgText>
        </Svg>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {paddingVertical: spacing.xl, alignItems: 'center'},
});
