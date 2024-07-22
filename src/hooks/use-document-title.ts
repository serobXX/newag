import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TPathsValues } from '../routes/types';

export const useDocumentTitle = (defaultName = 'Appsgeyser') => {
  const { t } = useTranslation();
  const [documentTitle, setDocumentTitle] = useState(document.title);

  const changeDocumentTitle = useCallback(
    (pathName: TPathsValues) => {
      setDocumentTitle(pathName ? `${defaultName} | ${t(pathName)}` : `${defaultName}`);
    },
    [defaultName, t],
  );

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return {
    documentTitle,
    changeDocumentTitle,
  };
};
