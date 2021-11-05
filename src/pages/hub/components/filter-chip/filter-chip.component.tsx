import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import * as Styled from './filter-chip.styles';
import { FilterChipProps } from './filter-chips.types';

const FilterChip: FC<FilterChipProps> = ({ text, onClick = () => null, selected = true, style }) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <Styled.Container style={style} selected={selected}>
        <Styled.ChipText selected={selected}>{text}</Styled.ChipText>
      </Styled.Container>
    </TouchableOpacity>
  );
};

export default FilterChip;
