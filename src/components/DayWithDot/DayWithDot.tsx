import { Badge } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { format } from 'date-fns';

export interface DayWithDotProps extends PickersDayProps {
  highlightedDays?: Set<string>;
}

const DayWithDot = (props: DayWithDotProps) => {
  const { highlightedDays, day, outsideCurrentMonth, ...other } = props;

  const hasEntry = !outsideCurrentMonth && highlightedDays?.has(format(day, 'yyyy-MM-dd'));

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      variant="dot"
      invisible={!hasEntry}
      sx={{
        '& .MuiBadge-badge': {
          bottom: 6,
          top: 'auto',
          left: '50%',
          right: 'auto',
          backgroundColor: other.selected ? '#fff' : 'primary.main',
          minWidth: 6,
          width: 6,
          height: 6,
          borderRadius: '50%',
          border: 'none',
          transform: 'translateX(-50%) scale(1)',
          transition: (theme) =>
            theme.transitions.create(['transform'], {
              duration: theme.transitions.duration.shortest,
            }),
          '&.MuiBadge-invisible': {
            transform: 'translateX(-50%) scale(0)',
          },
        },
      }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        sx={{
          ...(other.today && {
            border: (theme) =>
              `2px solid ${
                other.selected ? theme.palette.text.primary : theme.palette.primary.main
              } !important`,
          }),
        }}
      />
    </Badge>
  );
};

export default DayWithDot;
