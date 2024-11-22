import { ImageBackground, Text, TouchableOpacity, View, Image, ViewToken } from 'react-native';
import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import EmptyState from './EmptyState';
import * as Animatable from 'react-native-animatable';
import { VideoCreatorProp } from './VideoCard';
import { icons } from '@/constants';
import {Video,ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess} from 'expo-av'

interface PostType {
    id: string;
    title: string;
    thumbnail: string;
    prompt: string;
    video: string;
    creator: VideoCreatorProp;
}

interface TrendingProps {
    posts: PostType[];
}

interface TrendingItemProps {
    activeItem: PostType;
    item: PostType;
}

const zoomIn = {
    0: {
        opacity: 1,
        scale: 0.9,
    },
    1: {
        opacity: 1,
        scale: 1.1,
    },
};

const zoomOut = {
    0: {
        opacity: 0.7,
        scale: 0.95,
    },
    1: {
        opacity: 0.7,
        scale: 0.95,
    },
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false);

    return (
        <Animatable.View
            animation={activeItem.id === item.id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
              <Video
              
              source={{uri:item.video}}
       className="h-[260px] w-52 rounded-[35px] bg-white/10"
       resizeMode={ResizeMode.CONTAIN}
       shouldPlay
       useNativeControls
       onPlaybackStatusUpdate={(status)=>{
if (status && (status as AVPlaybackStatusSuccess).didJustFinish) setPlay(false)

       }}
              />
            ) : (
                <TouchableOpacity
                    className="justify-center items-center relative shadow-black/40"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        className="h-[260px] w-52 rounded-[35px] my-1 overflow-hidden"
                        resizeMode="cover"
                    />
                    <Image
                        className="w-12 h-12 absolute"
                        source={icons.play}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

export const Trending: React.FC<TrendingProps> = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    const viewableItemChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) setActiveItem(viewableItems[0].item as PostType);
    };

    return (
        <View className="mb-50 py-1 h-[300px]">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                horizontal
                onViewableItemsChanged={viewableItemChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 70,
                }}
                contentOffset={{ x: 170, y: 0 }}
                renderItem={({ item }) => (
                    <View className="h-[300px] w-[200px] mt-5">
                        <TrendingItem activeItem={activeItem} item={item} />
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="Be the first one to upload a video"
                    />
                )}
            />
        </View>
    );
};
