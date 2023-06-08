import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled, { css, useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'

import { BurgerMenuIcon, MoonIcon, SunIcon } from '../../assets/icons'
import { useAppThemeContext } from '../../styles/theme/provider'
import { SideBar } from '../SideBar'
import {
  getBreakpointsStyles,
  getDesktopStyles,
  useBreakpointValue,
} from '../../styles/breakpoints'
import { Text } from '../Text'
import { OpacityButton } from '../buttons/OpacityButton'
import { Button } from '../buttons/Button'
import FeedbackModal from '../../pages/FeedbackModal'
import { ROUTES } from '../../navigation/routes'
import { useAuthContext } from '../../contexts/auth'
import { firstLettersMaker } from '../../utils/text'

export const MainLayout = () => {
  const { colors, shadows } = useTheme()
  const { t } = useTranslation()
  const { themeType, setThemeType } = useAppThemeContext()
  const navigate = useNavigate()

  const { logger } = useAuthContext()

  const [isFeedbackModalVisible, setFeedbackModalVisible] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState()

  useEffect(() => navigate(selectedRoute), [selectedRoute])

  const iconSize = useBreakpointValue({ mobileValue: 24, tabletValue: 32, desktopValue: 32 })
  const nameFontSize = useBreakpointValue({
    mobileValue: 14,
    tabletValue: 18,
    desktopValue: 18,
  })

  const handleThemeChange = () => setThemeType(themeType === 'light' ? 'dark' : 'light')

  const routeTitles = {
    [ROUTES.PROFILE]: t('User Profile'),
    [ROUTES.CALENDAR]: t('Calendar'),
  }

  if (!logger) return null

  const userName = logger.name

  return (
    <MainWrap>
      <SideBar
        isBurgerMenuOpen={isBurgerMenuOpen}
        setIsBurgerMenuOpen={setIsBurgerMenuOpen}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
      />
      <ContentWrap>
        <Header>
          <Container>
            <HeaderWrap>
              <BurgerWrap>
                <OpacityButton onClick={() => setIsBurgerMenuOpen(true)}>
                  <BurgerMenuIcon size={iconSize} color={colors.icon} />
                </OpacityButton>
              </BurgerWrap>
              <DesktopTitleWrap>
                <Text
                  type='h1'
                  fontSize={32}
                  fontWeight={700}
                  lineHeight={1}
                  color={colors.text}
                  style={{ textShadow: shadows.headingShadow }}
                >
                  {routeTitles[selectedRoute]}
                </Text>
              </DesktopTitleWrap>
              <TabWrap>
                {selectedRoute === ROUTES.CALENDAR && (
                  <>
                    <Button title={t('Feedback')} onClick={() => setFeedbackModalVisible(true)} />
                    <FeedbackModal
                      visible={isFeedbackModalVisible}
                      setVisible={setFeedbackModalVisible}
                    />
                  </>
                )}
                <InfoWrap>
                  <OpacityButton onClick={handleThemeChange}>
                    {themeType === 'light' ? (
                      <MoonIcon size={iconSize} color={colors.primary} />
                    ) : (
                      <SunIcon size={iconSize} color={colors.primary} />
                    )}
                  </OpacityButton>
                  <Text type='p' color={'userNameText'} fontWeight={700} fontSize={nameFontSize}>
                    {userName}
                  </Text>
                  <OpacityButton>
                    <AvatarWrap onClick={() => setSelectedRoute(ROUTES.PROFILE)}>
                      <Text
                        type='p'
                        color={'userNameText'}
                        fontWeight={700}
                        fontSize={nameFontSize}
                      >
                        {firstLettersMaker(userName)}
                      </Text>
                    </AvatarWrap>
                  </OpacityButton>
                </InfoWrap>
              </TabWrap>
            </HeaderWrap>
          </Container>
        </Header>
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </ContentWrap>
    </MainWrap>
  )
}

const MainWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.mainBackground};
  display: flex;
`

const ContentWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 24px;
`

const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  width: 100%;
`

const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TabWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const BurgerWrap = styled.div`
  ${getDesktopStyles(css`
    display: none;
  `)}
`

const AvatarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border: 1.8px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;

  ${getBreakpointsStyles({
    tablet: css`
      width: 44px;
      height: 44px;
    `,
    desktop: css`
      width: 44px;
      height: 44px;
    `,
  })}
`

const DesktopTitleWrap = styled.div`
  display: none;
  ${getDesktopStyles(css`
    display: flex;
    justify-content: center;
    align-items: center;
  `)}
`

const OutletWrapper = styled.div`
  padding: 64px 20px 40px 20px;
  z-index: 0;
  ${getBreakpointsStyles({
    tablet: css`
      padding: 64px 32px 32px 32px;
    `,
    desktop: css`
      padding: 32px;
    `,
  })}
`
