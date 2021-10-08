import React from 'react';
import { hasConflict, getCourseTerm, getCourseNumber } from '../utilities/times';

const toggle = (x, lst) => (
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
  );
export const Course = ({ course, selected, setSelected }) => {
    const isSelected = selected.includes(course);
    const isDisabled = !isSelected && hasConflict(course, selected);
    const style = {
      backgroundColor: isDisabled ? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
    };
    return (
      <div className="card m-2 p-3"
        style={style}
        onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}>
        <div className="card-body">
        <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
          <div className="card-text">{ course.title }</div>
        </div>
      </div>
    );
  };