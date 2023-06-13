import styled from 'styled-components'
import { Button, Modal } from '../index'
import { useTranslation } from 'react-i18next'
import { Text } from '../Text'
import { useDeleteReview } from '../../hooks/query'


export const DeleteModal = ({ visible, setVisible, setDeleteVisible, title, review }) => {
    const { t } = useTranslation()
    const { deleteReview } = useDeleteReview()

    const handleDelete = () => {
        deleteReview(review.id)
        setDeleteVisible(false)
        setVisible(true)
  }
  
   const handleCancel = () => {
     setDeleteVisible(false)
     setVisible(true)
    }

    return (
    <Modal
        visible={visible}
        onEnterPress={() => setDeleteVisible(false)}
        onClose={() => setDeleteVisible(false)}
        title="delete modal"
        description="remove component">
        <Text type='h5' style={{ textAlign: "center" }}>
            {title}
        </Text>
        <ButtonsWrapper>
           <Button
              style={{ marginRight: 8, borderRadius: 8 }}
              fullWidth
              type='submit'
              title={t('Delete')}
              onClick={handleDelete}
            />
            <Button
              variant='secondary'
              fullWidth
              style={{ borderRadius: 8 }}
              title={t('Cancel')}
              onClick={handleCancel}
            />
        </ButtonsWrapper>
    </Modal>
    )
}

const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 18px;
`