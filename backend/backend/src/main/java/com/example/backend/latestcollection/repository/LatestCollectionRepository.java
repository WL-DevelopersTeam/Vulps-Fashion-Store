package com.example.backend.latestcollection.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.latestcollection.model.LatestCollection;

public interface LatestCollectionRepository  extends JpaRepository<LatestCollection, Long>
{

}
