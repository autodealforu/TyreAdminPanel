import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MENU } from '../../shared/menu';
import AlertBox from './AlertBox';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/auth';
import { useSelectAllNotification } from '../../shared/hooks/UseNotification';
// import renderHTML from 'react-render-html';
import { LOGO } from '../../domain/constant';

const Header = () => {
  const dispatch = useDispatch();
  const [activeProfile, setActiveProfile] = useState(false);
  const [activeNotificationMenu, setActiveNotificationMenu] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openSubSubMenu, setOpenSubSubMenu] = useState(null);
  const data = useSelector((state) => state.auth);
  const { user } = data;

  const [notification_data] = useSelectAllNotification();
  const { all_notifications } = notification_data;

  const logoutUser = () => {
    // console.log("LOGOUT");
    dispatch(logout());
  };
  return (
    <div>
      {user && (
        <div id='layout-wrapper'>
          <header id='page-topbar'>
            <div className='navbar-header'>
              <div className='d-flex'>
                {/* LOGO */}
                <div className='navbar-brand-box'>
                  <Link to='/dashboard' className='logo logo-dark'>
                    <span className='logo-sm'>
                      <img src='/images/logo.png' height={40} />
                    </span>
                    <span className='logo-lg'>
                      <img src='/images/logo.png' height={40} />{' '}
                    </span>
                  </Link>
                  <Link to='/dashboard' className='logo logo-light'>
                    <span className='logo-sm'>
                      <img src='/images/logo.png' height={40} />
                    </span>
                    <span className='logo-lg'>
                      <img src='/images/logo.png' height={40} />{' '}
                    </span>
                  </Link>
                </div>
                <button
                  type='button'
                  className='btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light'
                  data-bs-toggle='collapse'
                  data-bs-target='#topnav-menu-content'
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <i className='fa fa-fw fa-bars' />
                </button>

                {/* App Search*/}
              </div>

              {/*Notification here*/}
              <div className='d-flex'>
                {(user.role === 'SUPER ADMIN' || user.role === 'VENDOR') && (
                  <div
                    className='dropdown d-inline-block'
                    onClick={() =>
                      setActiveNotificationMenu(!activeNotificationMenu)
                    }
                  >
                    <button
                      type='button'
                      className='btn header-item text-danger'
                      id='page-header-user-dropdown'
                      data-bs-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      <i className='fa fa-bell'></i>
                      <span className='d-none d-xl-inline-block ms-1 fw-medium text-danger'>
                        {all_notifications && all_notifications.count
                          ? all_notifications.count
                          : 0}
                      </span>
                    </button>
                    <div
                      className={
                        activeNotificationMenu
                          ? 'dropdown-menu dropdown-menu-end show'
                          : 'dropdown-menu dropdown-menu-end'
                      }
                    >
                      {all_notifications &&
                        all_notifications.notifications &&
                        all_notifications.notifications.map((item) => {
                          return (
                            <>
                              <Link
                                className='dropdown-item'
                                to={`/orders/${item.order}/view?notification=${item._id}`}
                              >
                                {item.notes && <div dangerouslySetInnerHTML={{ __html: (item.notes) }} />}
                              </Link>

                              <div className='dropdown-divider' />
                            </>
                          );
                        })}
                    </div>
                  </div>
                )}
                <div
                  className='dropdown d-inline-block'
                  onClick={() => setActiveProfile(!activeProfile)}
                >
                  <button
                    type='button'
                    className='btn header-item'
                    id='page-header-user-dropdown'
                    data-bs-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <img
                      className='rounded-circle header-profile-user'
                      src='/images/user.png'
                      alt='Header Avatar'
                    />
                    <span className='d-none d-xl-inline-block ms-1 fw-medium'>
                      {user && user.name}
                    </span>
                    <i className='fa fa-angle-down d-none d-xl-inline-block' />
                  </button>
                  <div
                    className={
                      activeProfile
                        ? 'dropdown-menu dropdown-menu-end show'
                        : 'dropdown-menu dropdown-menu-end'
                    }
                  >
                    <Link className='dropdown-item' to='/profile'>
                      <i className='fa fa-user font-size-16 align-middle me-1' />{' '}
                      Profile
                    </Link>

                    <div className='dropdown-divider' />
                    <button
                      style={{ cursor: 'pointer' }}
                      className='dropdown-item'
                      onClick={() => logoutUser()}
                    >
                      <i className='fa fa-lock font-size-16 align-middle me-1' />{' '}
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className='topnav'>
            <div className='container-fluid'>
              <nav className='navbar navbar-light navbar-expand-lg topnav-menu desktop-only'>
                <div
                  className={
                    openMenu
                      ? 'collapse navbar-collapse show'
                      : 'collapse navbar-collapse'
                  }
                  id='topnav-menu-content'
                >
                  <ul className='navbar-nav'>
                    {MENU &&
                      MENU.map((sub_nav) => {
                        if (user.role && sub_nav.roles.includes(user.role)) {
                          return (
                            <li className='nav-item dropdown'>
                              <Link
                                className='nav-link  arrow-none'
                                to={sub_nav.link}
                                id='topnav-dashboard'
                                role='button'
                              >
                                <span
                                  data-key='t-dashboards'
                                  onClick={() =>
                                    sub_nav.menu
                                      ? setOpenSubMenu(sub_nav.label)
                                      : setOpenSubMenu(null)
                                  }
                                >
                                  {sub_nav.label}
                                </span>
                              </Link>
                              {sub_nav.menu && (
                                <div className='dropdown-menu'>
                                  {sub_nav.menu &&
                                    sub_nav.menu.map((sub_sub_nav) => {
                                      if (
                                        user.role &&
                                        sub_sub_nav.roles.includes(user.role)
                                      ) {
                                        return (
                                          <div className='dropdown'>
                                            <Link
                                              className='nav-link  arrow-none'
                                              to={sub_sub_nav.link}
                                            >
                                              {' '}
                                              <span
                                                data-key='t-dashboards'
                                                onClick={() =>
                                                  sub_sub_nav.menu
                                                    ? setOpenSubSubMenu(
                                                        sub_sub_nav.label
                                                      )
                                                    : setOpenSubSubMenu(null)
                                                }
                                              >
                                                {sub_sub_nav.label}
                                              </span>
                                            </Link>
                                            {sub_sub_nav.menu && (
                                              <div className='dropdown-menu'>
                                                {sub_sub_nav.menu.map(
                                                  (item) => {
                                                    return (
                                                      <div>
                                                        <Link
                                                          className='nav-link  arrow-none'
                                                          to={item.link}
                                                        >
                                                          {' '}
                                                          <span data-key='t-dashboards'>
                                                            {item.label}
                                                          </span>
                                                        </Link>
                                                      </div>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      }
                                    })}
                                </div>
                              )}
                            </li>
                          );
                        }
                      })}
                  </ul>
                </div>
              </nav>
              <nav className='navbar navbar-light navbar-expand-lg topnav-menu mobile-only'>
                <div
                  className={
                    openMenu
                      ? 'collapse navbar-collapse show'
                      : 'collapse navbar-collapse'
                  }
                  id='topnav-menu-content'
                >
                  <ul className='navbar-nav'>
                    {MENU &&
                      MENU.map((sub_nav, navIndex) => {
                        if (user.role && sub_nav.roles.includes(user.role)) {
                          return (
                            <li className='nav-item dropdown'>
                              <Link
                                className='nav-link  arrow-none'
                                to={sub_nav.link}
                                id='topnav-dashboard'
                                role='button'
                              >
                                <span
                                  data-key='t-dashboards'
                                  onClick={() =>
                                    sub_nav.menu
                                      ? setOpenSubMenu(sub_nav.label)
                                      : setOpenSubMenu(null)
                                  }
                                >
                                  {sub_nav.label}
                                </span>
                              </Link>
                              {sub_nav.menu && (
                                <div
                                  className='dropdown-menu'
                                  style={{
                                    display:
                                      openSubMenu === sub_nav.label
                                        ? 'block'
                                        : 'none',
                                  }}
                                >
                                  {sub_nav.menu &&
                                    sub_nav.menu.map((sub_sub_nav) => {
                                      if (
                                        user.role &&
                                        sub_sub_nav.roles.includes(user.role)
                                      ) {
                                        return (
                                          <div className='dropdown'>
                                            <Link
                                              className='nav-link  arrow-none'
                                              to={sub_sub_nav.link}
                                            >
                                              {' '}
                                              <span
                                                data-key='t-dashboards'
                                                onClick={() =>
                                                  sub_sub_nav.menu
                                                    ? setOpenSubSubMenu(
                                                        sub_sub_nav.label
                                                      )
                                                    : setOpenSubSubMenu(null)
                                                }
                                              >
                                                {sub_sub_nav.label}
                                              </span>
                                            </Link>
                                            {sub_sub_nav.menu && (
                                              <div
                                                className='dropdown-menu'
                                                style={{
                                                  display:
                                                    openSubSubMenu ===
                                                    sub_sub_nav.label
                                                      ? 'block'
                                                      : 'none',
                                                }}
                                              >
                                                {sub_sub_nav.menu.map(
                                                  (item) => {
                                                    return (
                                                      <div>
                                                        <Link
                                                          className='nav-link  arrow-none'
                                                          to={item.link}
                                                        >
                                                          {' '}
                                                          <span data-key='t-dashboards'>
                                                            {item.label}
                                                          </span>
                                                        </Link>
                                                      </div>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      }
                                    })}
                                </div>
                              )}
                            </li>
                          );
                        }
                      })}
                  </ul>
                </div>
              </nav>
            </div>
          </div>

          <div className='main-content' id='miniaresult' />
        </div>
      )}

      <AlertBox />
    </div>
  );
};

export default Header;
