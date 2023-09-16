
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppSelector } from 'src/controller/hooks';
import { useStatistic } from 'src/hooks/useStatistic';


export default function PayoutChart() {


  const {payoutStatistic} = useAppSelector(state => state.statistic);
  const {getData} = useStatistic();
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={getData(payoutStatistic)}
          margin={{
            top: 24
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="payout" stroke="#0377fc" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="funding" stroke="#b0becf" />
        </LineChart>
      </ResponsiveContainer>
    )
}
