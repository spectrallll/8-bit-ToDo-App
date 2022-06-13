import React from "react";
import clsx from "clsx";

const filters = ['All', 'Active', 'Completed'];

interface IFilterTaskProps {
    filterTask: (filterProperty: number) => void,
    filterProperty: number
}

const Filters: React.FC<IFilterTaskProps> = ({filterTask, filterProperty}) => {

    const onChangeFilter = (i: number) => {
        filterTask(i);
    }

    return (
      <div className='btn-container'>
          {filters.map((el, i) => <button disabled={filterProperty === i} onClick={(e) => {
              onChangeFilter(i);
          }} className={clsx('nes-btn is-primary', {'is-disabled': filterProperty === i})} key={i}>{el}</button>)}
      </div>
    );
}

export default Filters;