
interface CounterProps {
    count: number
}

const Counter: React.FC<CounterProps> = ({count}) => {
    return (
      <div>
          Tasks remaining: {count }
      </div>
    );
}

export default Counter;