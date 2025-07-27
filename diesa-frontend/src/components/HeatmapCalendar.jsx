import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

function HeatmapCalendar({ submissions }) {
  const today = new Date();

  return (
    <div className="mt-5">
      <h5 className="text-white mb-3">Your Submission Streak</h5>
      <CalendarHeatmap
        startDate={new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())}
        endDate={today}
        values={submissions}
        classForValue={value => {
          if (!value) return 'color-empty';
          if (value.count >= 5) return 'color-github-4';
          if (value.count >= 3) return 'color-github-3';
          if (value.count >= 1) return 'color-github-2';
          return 'color-github-1';
        }}
        showWeekdayLabels
      />
    </div>
  );
}

export default HeatmapCalendar;