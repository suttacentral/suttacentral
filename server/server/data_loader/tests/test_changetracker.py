import pytest

from data_loader.change_tracker import whoami, who_is_calling, function_source

def test_whomai():
    assert whoami() == test_whomai

class Foo:
    def method_returning_caller(self):
        return who_is_calling()
    
    def method_returns_itself(self):
        return whoami()

def test_method_call():
    foo = Foo()
    assert foo.method_returning_caller() == test_method_call
    assert foo.method_returns_itself() == Foo.method_returns_itself

def test_nested_call():
    def nested_returning_itself():
        return whoami()
    def nested_returning_caller():
        return who_is_calling()
    assert nested_returning_itself() == nested_returning_itself
    assert nested_returning_caller() == test_nested_call
   
def test_function_source():
    def bar():
        pass
        
    assert function_source(bar) == '    def bar():\n        pass\n'
    
    
        
