import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import PageContainer from '@/components/common/PageContainer';

test('PageContainer renders children', () => {
  const { getByText } = render(
    <PageContainer>
      <div>Free Palestine!</div>
    </PageContainer>
  );

  expect(getByText('Free Palestine!')).toBeInTheDocument();
});

test('PageContainer has correct default max width', () => {
  const { getByTestId } = render(
    <PageContainer>
      <div>Free Palestine!</div>
    </PageContainer>
  );

  const container = getByTestId('page-container');
  expect(container).toBeInTheDocument();
  expect(container).toHaveStyle({
    maxWidth: '978px',
  });
});

test('PageContainer has correct custom max width', () => {
  const { getByTestId } = render(
    <PageContainer customMaxWidth={800}>
      <div>Free Palestine!</div>
    </PageContainer>
  );

  const container = getByTestId('page-container');
  expect(container).toBeInTheDocument();
  expect(container).toHaveStyle('maxWidth: 800px;');
});

test('PageContainer has correct min width', () => {
  const { getByTestId } = render(
    <PageContainer>
      <div>Free Palestine!</div>
    </PageContainer>
  );

  const container = getByTestId('page-container');
  expect(container).toBeInTheDocument();
  expect(container).toHaveStyle({
    minWidth: '300px',
  });
});