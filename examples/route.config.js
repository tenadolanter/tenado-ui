import navConfig from "./nav.config";

const registerRoute = (navConfig) => {
  let route = [];
  let navs = navConfig;
  route.push({
    path: `/`,
    redirect: `/installation`,
    component: (r) =>
      require.ensure([], () => r(require(`./components/component.vue`))),
    children: [],
  });
  navs.forEach((nav) => {
    if (nav.href) return;
    if (nav.groups) {
      nav.groups.forEach((group) => {
        group.list.forEach((nav) => {
          addRoute(nav, 0);
        });
      });
    } else if (nav.children) {
      nav.children.forEach((nav) => {
        addRoute(nav, 0);
      });
    } else {
      addRoute(nav, 0);
    }
  });
  function addRoute(page, index) {
    const component = (r) =>
      require.ensure([], () => r(require(`./docs${page.path}.md`)));
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
      },
      name: "component-" + (page.title || page.name),
      component: component.default || component,
    };

    route[index].children.push(child);
  }

  return route;
};

let route = registerRoute(navConfig);

const generateMiscRoutes = function() {
  let indexRoute = {
    path: `/`,
    name: "home",
    redirect: `/installation`,
  };

  return [indexRoute];
};

route.concat(generateMiscRoutes());

route = route.concat([
  {
    path: "/",
    redirect: `/installation`,
  },
  {
    path: "*",
    redirect: "/",
  },
]);

export default route;
