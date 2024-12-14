---
title: 手动实现智能指针
date: '2023/06/19 14:25:00'
tags:
  - 智能指针
  - RAII
categories: Cpp
cover: 'https://image.yaco.email/smartpoint.png'
abbrlink: 1436050551
---
# 手动实现智能指针



```cc
/// unique_ptr
template <typename T>
class smart_ptr {
public:
    explicit smart_ptr(T* ptr = nullptr) : ptr_(ptr) {}
    ~smart_ptr()
    {
    	delete ptr_;
    }
    T* get() const { return ptr_; }
    T& operator*() const { return *ptr_; }
    T* operator->() const { return ptr_; }
    operator bool() const { return ptr_; }
    ///
	smart_ptr(smart_ptr& other)
    {
   		ptr_ = other.release();		// 释放指针所有权
    }
    smart_ptr& operator=(smart_ptr& rhs)
    {
    	smart_ptr(rhs).swap(*this);
    	return *this;
    }
    T* release()
    {
		T* ptr = ptr_;
		ptr_ = nullptr;
		return ptr;
    }
    void swap(smart_ptr& rhs)
    {
    	using std::swap;
    	swap(ptr_, rhs.ptr_);
    }
    
private:
    T* ptr_;
};

```

**智能指针的理解：就是通过被管理类的实例去构造一个管理的类，意思就是：老子[程序员]不想管了，你来帮我管好它**

```cc
//shared_ptr
class shared_count {
public:
    shared_count() : count_(1) {}
    void add_count()
    {
        ++count_;
    }
    long reduce_count()
    {
        return --count_;
    }
    long get_count() const
    {
        return count_;
    }
    
private:
    long count_;
};

template <typename T>
class smart_ptr {
public:
    explicit smart_ptr(T* ptr = nullptr)
    : ptr_(ptr)
    {
        if (ptr) 
        {
            shared_count_ = new shared_count();
        }
    }
    ~smart_ptr()
    {
        if (ptr_ &&!shared_count_->reduce_count()) 
        {
            delete ptr_;
            delete shared_count_;
        }
    }
    template <typename U>
    smart_ptr(const smart_ptr<U>& other)
    {
        ptr_ = other.ptr_;
        if (ptr_) 
        {
            other.shared_count_->add_count();
            shared_count_ = other.shared_count_;
        }
    }
    template <typename U>
    smart_ptr(smart_ptr<U>&& other)
    {
        ptr_ = other.ptr_;
        if (ptr_) 
        {
            shared_count_ = other.shared_count_;
            other.ptr_ = nullptr;
        }
    }

    void swap(smart_ptr& rhs)
    {
        std::swap(ptr_, rhs.ptr_);
        std::swap(shared_count_,rhs.shared_count_);
    }

    long use_count() const
    {
        if (ptr_) {
            return shared_count_ -> get_count();
        } else {
            return 0;
        }
    }

private:
    T* ptr_;
    shared_count* shared_count_;
};

```

