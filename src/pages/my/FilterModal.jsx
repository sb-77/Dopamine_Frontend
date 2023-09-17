import { useCallback, useEffect, useRef, useState } from 'react';
import Overlay from '../../components/common/modal/Overlay';
import StyledModal from './StyledModal';

import Select from '../../components/common/select/Select';

const FilterModal = ({ setIsModalOpen }) => {
  const [selectedOpt, setSelectedOpt] = useState([]);
  const [isSelectOn, setIsSelectOn] = useState(false);

  const thisYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(`${thisYear}년`);

  /* 모달 기본 기능 */
  const modal = useRef(null);
  useEffect(() => {
    // 모달 외 클릭 시 모달 close
    const closeModal = (e) => {
      if (e.target.tagName === 'HTML') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('click', closeModal);
    window.addEventListener('touchstart', closeModal);
  }, []);

  const setModal = useCallback((node) => {
    modal.current = node;
    node.showModal();
  }, []);
  /* ------------ */

  const monthList = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  const handleBtn = (v) => {
    const index = selectedOpt.indexOf(`${selectedYear}${v}`);

    if (index === -1) {
      setSelectedOpt([...selectedOpt, `${selectedYear}${v}`]);
    } else {
      setSelectedOpt([
        ...selectedOpt.slice(0, index),
        ...selectedOpt.slice(index + 1),
      ]);
    }
  };

  return (
    <Overlay>
      <StyledModal
        ref={(node) => {
          if (node) {
            setModal(node);
          }
        }}
      >
        <p>어떤 날의 기록이 궁금하세요?</p>
        <Select
          selectedOpt={selectedYear}
          setSelectedOpt={setSelectedYear}
          optionTextList={[
            `${thisYear}년`,
            `${thisYear - 1}년`,
            `${thisYear - 2}년`,
          ]}
          onClick={() => setIsSelectOn(true)}
        ></Select>
        <ul>
          {monthList.map((v, i) => {
            return (
              <li key={i}>
                <button
                  onClick={() => handleBtn(v)}
                  className={
                    selectedOpt.includes(`${selectedYear}${v}`)
                      ? 'selected'
                      : ''
                  }
                >
                  {v}월
                </button>
              </li>
            );
          })}
        </ul>
      </StyledModal>
    </Overlay>
  );
};

export default FilterModal;
