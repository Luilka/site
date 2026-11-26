from nexy.decorators import Container, Injectable, Scope


def test_container_resolves_a_singleton_once() -> None:
    @Injectable()
    class Settings:
        def __init__(self) -> None:
            self.value = "luilka"

    first = Container.resolve(Settings)
    second = Container.resolve(Settings)
    assert first is second


def test_container_resolves_a_transient_each_time() -> None:
    @Injectable(scope=Scope.TRANSIENT)
    class RequestId:
        pass

    first = Container.resolve(RequestId)
    second = Container.resolve(RequestId)
    assert first is not second


def test_container_reuses_a_request_scoped_instance() -> None:
    @Injectable(scope=Scope.REQUEST)
    class Session:
        pass

    Container.clear_request_scope()
    first = Container.resolve(Session)
    second = Container.resolve(Session)
    assert first is second


def test_injectable_refuses_direct_construction() -> None:
    @Injectable()
    class Service:
        def __init__(self) -> None:
            self.value = 1

    try:
        Service()
    except TypeError as error:
        assert "managed by Nexy" in str(error)
    else:
        raise AssertionError("direct construction was accepted")


def test_container_resolves_nested_injectable_dependencies() -> None:
    @Injectable()
    class Repository:
        def load(self) -> str:
            return "record"

    @Injectable()
    class UseCase:
        def __init__(self, repository: Repository) -> None:
            self.repository = repository

    use_case = Container.resolve(UseCase)
    assert use_case.repository.load() == "record"


def test_container_refuses_a_dependency_without_a_default() -> None:
    @Injectable()
    class Broken:
        def __init__(self, missing: str) -> None:
            self.missing = missing

    try:
        Container.resolve(Broken)
    except ValueError as error:
        assert "missing" in str(error)
    else:
        raise AssertionError("a missing dependency was accepted")


@Injectable()
class CycleFirst:
    def __init__(self, dependency: "CycleSecond") -> None:
        self.dependency = dependency


@Injectable()
class CycleSecond:
    def __init__(self, dependency: CycleFirst) -> None:
        self.dependency = dependency


def test_container_refuses_a_dependency_cycle() -> None:
    try:
        Container.resolve(CycleFirst)
    except RecursionError:
        assert True
    else:
        raise AssertionError("a dependency cycle was accepted")
